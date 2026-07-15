using System.Text;
using System.Threading.RateLimiting;
using API.Data;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SQLitePCL;

var builder = WebApplication.CreateBuilder(args);

Batteries.Init();


// --------------------------------------------------
// DATABASE
// --------------------------------------------------

builder.Services.AddDbContext<DataContext>(options =>
{
    var connectionString =
        builder.Configuration.GetConnectionString("DefaultConnection");

    options.UseSqlite(connectionString);
});


// --------------------------------------------------
// RATE LIMITER
// --------------------------------------------------

// Kullanıcının API'ye kısa sürede aşırı istek göndermesini engeller.
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode =
        StatusCodes.Status429TooManyRequests;

    options.AddPolicy("cart-policy", httpContext =>
    {
        var customerId =
            httpContext.Request.Cookies["customerId"]
            ?? httpContext.Connection.RemoteIpAddress?.ToString()
            ?? "anonymous";

        return RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: customerId,
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromSeconds(5),
                QueueLimit = 0,
                AutoReplenishment = true
            });
    });
});


// --------------------------------------------------
// CORS
// --------------------------------------------------

builder.Services.AddCors();


// --------------------------------------------------
// IDENTITY
// --------------------------------------------------

builder.Services
    .AddIdentity<AppUser, AppRole>()
    .AddEntityFrameworkStores<DataContext>();


// Şifre ve kullanıcı kuralları
builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireDigit = false;

    options.User.RequireUniqueEmail = true;
});


// --------------------------------------------------
// TOKEN SERVICE
// --------------------------------------------------

// Bir controller ITokenService istediğinde,
// TokenService nesnesi oluşturulmasını sağlar.
builder.Services.AddScoped<ITokenService, TokenService>();


// --------------------------------------------------
// JWT AUTHENTICATION
// --------------------------------------------------

var tokenKey = builder.Configuration["TokenKey"];

if (string.IsNullOrWhiteSpace(tokenKey))
{
    throw new InvalidOperationException(
        "TokenKey appsettings.json içerisinde bulunamadı."
    );
}

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme =
            JwtBearerDefaults.AuthenticationScheme;

        options.DefaultChallengeScheme =
            JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                // Token bizim gizli anahtarımızla mı imzalanmış?
                ValidateIssuerSigningKey = true,

                // TokenService içerisinde kullanılan anahtarın aynısı
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(tokenKey)
                ),

                // Şu an issuer kontrolü yapmıyoruz(yayaıncı kontrolü yok- çok takılma buna)
                ValidateIssuer = false,

                // Şu an audience kontrolü yapmıyoruz(yarın bir gün firma kontrol eder mi sanmam takılmayalım bunada)
                ValidateAudience = false,

                // Token süresi dolmuş mu kontrol et(buna takıl eleman gelip girmekk ister filan aman ha)
                ValidateLifetime = true,

                // Token bittiğinde ek süre tanıma(ek üsre)
                ClockSkew = TimeSpan.Zero
            };
    });


// [Authorize] sistemi için gerekli servis
builder.Services.AddAuthorization();


// --------------------------------------------------
// CONTROLLERS VE OPENAPI
// --------------------------------------------------

builder.Services.AddControllers();
builder.Services.AddOpenApi();


var app = builder.Build();


// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.UseMiddleware<API.Middlewares.ExceptionHandling>();

app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint(
            "/openapi/v1.json",
            "Demo API"
        );
    });
}
else
{
    app.UseHttpsRedirection();
}


app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowCredentials();

    options.WithOrigins(
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    );
});


// Sıralama önemlidir:
// 1. Token'daki kullanıcıyı bul
app.UseAuthentication();

// 2. Kullanıcının yetkisini kontrol et
app.UseAuthorization();

app.UseRateLimiter();

app.MapControllers();

SeedData.Initialize(app);

app.Run();
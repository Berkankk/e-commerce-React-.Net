using System.Threading.RateLimiting;
using API.Data;
using API.Entity;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

var builder = WebApplication.CreateBuilder(args);

Batteries.Init();

builder.Services.AddDbContext<DataContext>(options =>
{
    var config = builder.Configuration;
    var connectionString = config.GetConnectionString("DefaultConnection");

    options.UseSqlite(connectionString);
});


//Kullanıcı aşırı istek atmaması için burada gerekli rate limiti ekledik apiye sürekli istek atıp durmasın
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

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



builder.Services.AddCors();
builder.Services.AddIdentity<AppUser,AppRole>().AddEntityFrameworkStores<DataContext>();
builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build(); 

app.UseMiddleware<API.Middlewares.ExceptionHandling>();


app.UseStaticFiles();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Demo API");
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
    options.AllowCredentials(); //Burası cookie izin vermemiz için yazıldı
    options.WithOrigins("http://localhost:3000", "http://127.0.0.1:3000");
});
app.UseAuthorization();
app.UseRateLimiter();
app.MapControllers();

SeedData.Initialize(app);

app.Run();
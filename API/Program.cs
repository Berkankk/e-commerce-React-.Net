using API.Data;
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

builder.Services.AddCors();

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
    options.WithOrigins("http://localhost:3000", "http://127.0.0.1:3000");
});
app.UseAuthorization();

app.MapControllers();

app.Run();
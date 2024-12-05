using Microsoft.EntityFrameworkCore;
using System.Xml;
using WebApi.Models;
using WebApi.Repository.Auth;
using WebApi.Repository.Customers;
using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);
var environment = builder.Environment;
var configuration = new ConfigurationBuilder()
    .SetBasePath(environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.Development.json", optional: true)
    .Build();


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<BankContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"), b =>
        b.MigrationsAssembly(typeof(BankContext).Assembly.FullName)));



builder.Services.AddScoped<ICustomersRepository, CustomersRepository>();
builder.Services.AddScoped<AuthServices>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMemoryCache();
var allowedOrigins = builder.Configuration.GetSection("AllowedCorsOrigins").Get<string[]>();
builder.Services.AddCors(options =>
    options.AddPolicy("AllowOrigin", build =>
            build.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()));
var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
app.UseSwagger();
app.UseSwaggerUI();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors("AllowOrigin");
app.UseAuthorization();

app.MapControllers();

app.Run();
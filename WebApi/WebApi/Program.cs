using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using WebApi.Models;
using WebApi.Repository.Auth;
using WebApi.Repository.Customers;
using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Dependency Injection
builder.Services.AddScoped<ICustomersRepository, CustomersRepository>();
builder.Services.AddScoped<AuthServices>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();

// Swagger Configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddDbContext<BankContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), b =>
        b.MigrationsAssembly(typeof(BankContext).Assembly.FullName)));

// CORS Policy
var allowedOrigins = builder.Configuration.GetSection("AllowedCorsOrigins").Get<string[]>();
builder.Services.AddCors(options =>
    options.AddPolicy("AllowOrigin", build =>
        build.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()));
builder.Services.AddSwaggerGen();
// JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:Key").Value)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

builder.Services.AddMemoryCache();

var app = builder.Build();

// Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseCors("AllowOrigin");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
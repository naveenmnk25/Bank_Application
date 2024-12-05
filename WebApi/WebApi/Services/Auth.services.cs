using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using WebApi.Models;

namespace WebApi.Services
{
    public class AuthServices(IConfiguration configuration)
    {
        private readonly IConfiguration _configuration = configuration;

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordsalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordsalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public string CreateToken(Customer customer, User user, Role role)
        {
            // Ensure the JWT key is configured
            var jwtKey = _configuration.GetSection("Jwt:Key")?.Value;
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT Key is not configured in appsettings.json.");
            }

            // Define claims
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, customer.FirstName),
        new Claim(ClaimTypes.Email, customer.Email!),
        new Claim(ClaimTypes.Role, role?.RoleName ?? "Customer"),
        new Claim("UserId", user.Id.ToString()), // Custom claim for User ID
        new Claim("CustomerId", customer.CustomerId.ToString()), // Custom claim for Customer ID
    };

            // Generate key and credentials
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature); // Changed to HmacSha256

            // Create the token
            var token = new JwtSecurityToken(
                  claims: claims,
                  signingCredentials: credentials,
                  expires: DateTime.Now.AddHours(1)
                  );

            // Return the serialized token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordsalt)
        {
            using (var hmac = new HMACSHA512(passwordsalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
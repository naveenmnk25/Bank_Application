using WebApi.Models;

namespace WebApi.DTO
{
    public class LoginResponseDto
    {
        public string? Token { get; set; }
        public string? Role { get; set; }
        public Customer? Customer { get; set; }
    }
}
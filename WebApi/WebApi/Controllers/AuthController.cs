using Microsoft.AspNetCore.Mvc;
using WebApi.DTO;
using WebApi.Repository.Auth;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthRepository authRepository) : Controller
    {
        private readonly IAuthRepository _authRepository = authRepository;

        [HttpPost("register")]
        public async Task<IActionResult> Register(CustomerDto customer)
        {
            var user = await _authRepository.Register(customer);
            if (user == null) return Conflict(new { StatusCode = 409, Message = "Email or Phone Number already exists!" });

            return Ok(new { StatusCode = 201, Message = "Registration successful!", Customer = user });
        }

        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponseDto>> Login(string Email, string Password)
        {
            var loginResponse = await _authRepository.Login(Email!, Password!);

            if (loginResponse == null) return Conflict(new { StatusCode = 409, Message = "Wrong password!" });

            return Ok((new { StatusCode = 200, Message = "Login successful!", User = loginResponse }));
        }
    }
}
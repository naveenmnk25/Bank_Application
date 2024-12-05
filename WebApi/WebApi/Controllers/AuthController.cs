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
            if (user == null) return Conflict(new {Message = "Email or Phone Number already exists!" });

            return Ok(new { Message = "Registration successful!", Customer = user });
        }

        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponseDto>> Login(string Email, string Password)
        {
            var loginResponse = await _authRepository.Login(Email!,Password!);

            if (loginResponse == null) return Conflict(new { Message = "Wrong password!" });

            return Ok((new { Message = "Login successful!", User = loginResponse }));
        }
    }
}

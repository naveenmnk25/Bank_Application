using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.DTO;
using WebApi.Models;
using WebApi.Repository.Auth;
using WebApi.Repository.Customers;

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
            if (user.CustomerId == 0) return Conflict("Email or Phone Number already exists!");

            return Ok(new { Message = "Registration successful!", Customer = user });
        }

        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponseDto>> Login(CustomerDto customer)
        {
            var loginResponse = await _authRepository.Login(customer.Email!,customer.Password!);

            if (loginResponse.Customer!.CustomerId == 0) return Conflict("Wrong password!");

            return Ok((new { Message = "Login successful!", User = loginResponse }));
        }
    }
}

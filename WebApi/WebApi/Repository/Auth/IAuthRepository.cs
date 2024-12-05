using WebApi.DTO;
using WebApi.Models;

namespace WebApi.Repository.Auth
{
    public interface IAuthRepository
    {
        Task<Customer> Register(CustomerDto customer);

        Task<LoginResponseDto> Login(string Email, string Password);
    }
}
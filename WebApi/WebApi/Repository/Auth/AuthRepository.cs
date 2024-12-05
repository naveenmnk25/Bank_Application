using Azure.Core;
using Microsoft.EntityFrameworkCore;
using WebApi.DTO;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Repository.Auth
{
    public class AuthRepository(BankContext context,AuthServices authServices) : IAuthRepository
    {
        private readonly BankContext _context = context;
        private readonly AuthServices _authServices = authServices;

        public async Task<Customer> Register(CustomerDto customer) {

            var existingCustomer = _context.Customers.Where(x => x.Email==customer.Email || x.PhoneNumber==customer.PhoneNumber).FirstOrDefault();

            if (existingCustomer != null)
            {
                return new Customer();
            }

            _authServices.CreatePasswordHash(customer.Password!, out byte[] passwordHash, out byte[] passwordSalt);


            var newCustomer = new Customer
            {
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                PhoneNumber = customer.PhoneNumber,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = customer.Role ?? "user"
            };
            await _context.Customers.AddAsync(newCustomer);
            await _context.SaveChangesAsync();

            return newCustomer;
        
        }

        public async Task<LoginResponseDto> Login(string email, string password)
        {

            var customer = await _context.Customers.Where(x => x.Email == email).FirstOrDefaultAsync();

            if (customer == null)
            {
                return new LoginResponseDto(); 
            }
            if (!_authServices.VerifyPasswordHash(password, customer.PasswordHash!, customer.PasswordSalt!))
            {
                //return BadRequest("Wrong password");
            }
            string token =  _authServices.CreateToken(customer!);

            return new LoginResponseDto()
            {
                Token= token,
                Customer= customer
            };

        }
    }
}

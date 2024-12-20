using Microsoft.EntityFrameworkCore;
using WebApi.DTO;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Repository.Auth
{
    public class AuthRepository(BankContext context, AuthServices authServices) : IAuthRepository
    {
        private readonly BankContext _context = context;
        private readonly AuthServices _authServices = authServices;

        public async Task<Customer?> Register(CustomerDto customer)
        {
            bool customerExists = await _context.Customers
                .AnyAsync(x => x.Email == customer.Email || x.PhoneNumber == customer.PhoneNumber);

            if (customerExists)
            {
                return null;
            }

            _authServices.CreatePasswordHash(customer.Password!, out byte[] passwordHash, out byte[] passwordSalt);

            var newCustomer = new Customer
            {
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                PhoneNumber = customer.PhoneNumber,
                AccountCreationDate = DateTime.UtcNow,
                DateOfBirth = customer.DateOfBirth,
                Gender = customer.Gender
            };
            await _context.Customers.AddAsync(newCustomer);
            await _context.SaveChangesAsync();

            if (customer.CustomerAddress != null)
            {
                var newCustomerAddress = new CustomerAddress
                {
                    CustomerId = newCustomer.CustomerId,
                    Address = customer.CustomerAddress.Address,
                    City = customer.CustomerAddress.City,
                    State = customer.CustomerAddress.State,
                    PostalCode = customer.CustomerAddress.PostalCode,
                    Country = customer.CustomerAddress.Country,
                    CreatedDate = DateTime.UtcNow,
                    CreatedBy = newCustomer.CustomerId
                };
                await _context.CustomerAddresses.AddAsync(newCustomerAddress);
            }

            var newUser = new User
            {
                Email = customer.Email!,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                RoleId = 3,
                CreatedDate = DateTime.UtcNow
            };
            await _context.Users.AddAsync(newUser);

            await _context.SaveChangesAsync();

            return newCustomer;
        }

        public async Task<LoginResponseDto?> Login(string email, string password)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return null;
            }

            if (!_authServices.VerifyPasswordHash(password, user.PasswordHash!, user.PasswordSalt!))
            {
                return null;
            }

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);

            if (customer == null)
            {
                return null;
            }

            string token = _authServices.CreateToken(customer, user, user.Role!);
            var Role = await _context.Roles.FirstOrDefaultAsync(c => c.RoleId == user.RoleId);
            return new LoginResponseDto
            {
                Token = token,
                Role = Role!.RoleName,
                Customer = customer
            };
        }
    }
}
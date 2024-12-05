using WebApi.Models;

namespace WebApi.DTO
{
    public class CustomerDto
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public DateOnly DateOfBirth { get; set; }

        public string? Gender { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
        public string? Password { get; set; }
        public DateTime? AccountCreationDate { get; set; }

        public bool IsActive { get; set; }
        public CustomerAddressDto? CustomerAddress { get; set; }

    }
}

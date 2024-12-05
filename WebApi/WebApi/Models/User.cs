namespace WebApi.Models;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public byte[] PasswordHash { get; set; } = null!;

    public byte[] PasswordSalt { get; set; } = null!;

    public int RoleId { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime ModifiedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<Customer> CustomerCreatedByNavigations { get; set; } = new List<Customer>();

    public virtual ICollection<Customer> CustomerModifiedByNavigations { get; set; } = new List<Customer>();

    public virtual ICollection<User> InverseCreatedByNavigation { get; set; } = new List<User>();

    public virtual ICollection<User> InverseModifiedByNavigation { get; set; } = new List<User>();

    public virtual User? ModifiedByNavigation { get; set; }

    public virtual Role Role { get; set; } = null!;
}
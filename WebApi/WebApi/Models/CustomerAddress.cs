namespace WebApi.Models;

public partial class CustomerAddress
{
    public int AddressId { get; set; }

    public int CustomerId { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string PostalCode { get; set; } = null!;

    public string Country { get; set; } = null!;

    public DateTime CreatedDate { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime ModifiedDate { get; set; }

    public int? ModifiedBy { get; set; }

    public virtual Customer Customer { get; set; } = null!;
}
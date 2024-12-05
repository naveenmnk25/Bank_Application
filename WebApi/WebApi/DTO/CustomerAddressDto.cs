﻿namespace WebApi.DTO
{
    public class CustomerAddressDto
    {
        public int CustomerId { get; set; }

        public string Address { get; set; } = null!;

        public string City { get; set; } = null!;

        public string State { get; set; } = null!;

        public string PostalCode { get; set; } = null!;

        public string Country { get; set; } = null!;
    }
}
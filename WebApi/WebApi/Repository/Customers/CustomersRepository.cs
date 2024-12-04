﻿using Microsoft.EntityFrameworkCore;
using System.Xml;
using WebApi.Models;

namespace WebApi.Repository.Customers
{
    public class CustomersRepository(BankContext context) : ICustomersRepository
    {
        private readonly BankContext _context = context;

        public async Task<List<Customer>> GetCustomers()
        {
            try
            {
                return await _context.Customers.ToListAsync();
            }
            catch (Exception)
            {
                return [];
                throw;
            }
        }
        public async Task<Customer> GetCustomerById(int id)
        {
            return await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
        }

        public async Task<Customer> CreateCustomer(Customer customer)
        {
            try
            {
                await _context.Customers.AddAsync(customer);
                await _context.SaveChangesAsync();
                return customer;
            }
            catch
            {
                throw;
            }
        }

        public async Task<Customer> UpdateCustomer(Customer customer)
        {
            var existingCustomer = await _context.Customers.FindAsync(customer.CustomerId);
            if (existingCustomer == null) return null;

            existingCustomer.FirstName = customer.FirstName;
            existingCustomer.LastName = customer.LastName;
            existingCustomer.DateOfBirth = customer.DateOfBirth;
            existingCustomer.Gender = customer.Gender;
            existingCustomer.Email = customer.Email;
            existingCustomer.PhoneNumber = customer.PhoneNumber;
            existingCustomer.IsActive = customer.IsActive;

            _context.Customers.Update(existingCustomer);
            await _context.SaveChangesAsync();
            return existingCustomer;
        }

        public async Task<int> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null) return 0;

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return customer.CustomerId;
        }
    }
}
using WebApi.Models;

namespace WebApi.Repository.Customers
{
    public interface ICustomersRepository
    {
        Task<List<Customer>> GetCustomers();

        Task<Customer> GetCustomerById(string mail);

        Task<Customer> CreateCustomer(Customer customer);

        Task<Customer> UpdateCustomer(Customer customer);

        Task<int> DeleteCustomer(int id);
    }
}
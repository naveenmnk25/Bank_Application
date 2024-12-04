using Microsoft.AspNetCore.Mvc;
using System.Xml.Linq;
using WebApi.Models;
using WebApi.Repository.Customers;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController(ICustomersRepository customersRepository) : Controller
    {

        private readonly ICustomersRepository _customersRepository = customersRepository;

        // Get All Customers
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            var customers = await _customersRepository.GetCustomers();
            return Ok(customers);
        }

        // Get Customer by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await _customersRepository.GetCustomerById(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        // Create Customer
        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] Customer customer)
        {
            if (customer == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdCustomer = await _customersRepository.CreateCustomer(customer);
            return CreatedAtAction(nameof(GetCustomer), new { id = createdCustomer.CustomerId }, createdCustomer);
        }

        // Update Customer
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, [FromBody] Customer customer)
        {
            if (id != customer.CustomerId || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedCustomer = await _customersRepository.UpdateCustomer(customer);
            if (updatedCustomer == null)
            {
                return NotFound();
            }
            return Ok(updatedCustomer);
        }

        // Delete Customer
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var isDeleted = await _customersRepository.DeleteCustomer(id);
            if (isDeleted==0)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PathConstants } from "../../routing/path-contants";
import {
  addCustomer,
  deleteCustomer,
  fetchCustomer,
  updateCustomer,
} from "../../redux/actions/CustomerAction";
import { CustomerModel } from "../../models/Customer.model";

function Customer() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(CustomerModel);
  const [isEditing, setIsEditing] = useState(false);

  // Local loading state

  //--- State Data -------//
  const customerList = useSelector((state) => state.customer.customerList);

  //--- useEffect -------//
  useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);

  useEffect(() => {
    console.log("customerList: ", customerList);
  }, [customerList]);

  //----- Handle Data Changes Functions------//
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateCustomer(formData));
    } else {
      dispatch(addCustomer(formData));
    }
    resetForm();
    closeModal();
  };
  // Open modal
  const openModal = (customer = null) => {
    if (customer) {
      setFormData(customer);
      setIsEditing(true);
    } else {
      resetForm();
    }
  };

  // Close modal
  const closeModal = () => {
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormData(CustomerModel);
    setIsEditing(false);
  };
  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Customer Management</h2>

        {/* Add Customer Button */}
        <button
          className="btn btn-primary mb-3"
          onClick={() => openModal()}
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add Customer
        </button>

        {/* Customer Table */}
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerList && customerList.length > 0 ? (
              customerList.map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.dateOfBirth}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.isActive ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm mr-2"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => openModal(customer)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm ms-1"
                      onClick={() => handleDelete(customer.customerId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Bootstrap Modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Customer" : "Add Customer"}
                </h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleChange}
                      />{" "}
                      Active
                    </label>
                  </div>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2 mt-3"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      data-bs-dismiss="modal"
                    >
                      {isEditing ? "Update Customer" : "Add Customer"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customer;

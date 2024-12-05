import { useState } from "react";
import { CustomerModel } from "../../models/Customer.model";
import "../../styles/Login.scss"; 
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/actions/CustomerAction";
import { register } from "../../redux/actions/AuthAction";

const RegisterPage = () => {
  
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(CustomerModel);

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
      dispatch(register(formData));
  };

  return (
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
      <label>Password</label>
      <input
        type="password"
        className="form-control"
        name="password"
        value={formData.password}
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
      >
        Close
      </button>
      <button
        type="submit"
        className="btn btn-primary mt-3"
      >
        Add
      </button>
    </div>
  </form>
  );
};

export default RegisterPage;

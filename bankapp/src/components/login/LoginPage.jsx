import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.scss";
import { useAuth } from "../../auth/auth";
import { PathConstants } from "../../routing/path-contants";
import { useDispatch } from "react-redux";
import { fetchCustomerByIdEmail } from "../../redux/actions/CustomerAction";
import RegisterPage from "./RegisterPage";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [isRegister, SetisRegister] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "SathishKumarkumar@gmail.com",
    password: "Sathish@123",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submitting

    try {
      // Call the login function from context
      await auth.Login(formData.username, formData.password);
      navigate(PathConstants.DASHBOARD); // Redirect to the dashboard after successful login
      dispatch(fetchCustomerByIdEmail(formData.username));
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div id="login">
      <div className="l-form">
        <div className="shape1"></div>
        <div className="shape2"></div>

        <div className="form">
          <img
            src="https://i.postimg.cc/WbVD3VTV/authentication.png"
            alt="authentication"
            className="form-img"
          />
          {isRegister ? (
            <>
              {" "}
              <RegisterPage />{" "}
            </>
          ) : (
            <>
              <form action="#" className="form-content" onSubmit={handleSubmit}>
                <h1 className="form-title">Welcome</h1>

                {/* Username Input */}
                <div className="form-div form-div-one">
                  <div className="form-icon">
                    <i className="bx bxs-user-circle"></i>
                  </div>

                  <div className="form-div-input">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter Username"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="form-div">
                  <div className="form-icon">
                    <i className="bx bx-lock"></i>
                  </div>

                  <div className="form-div-input">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter Password"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                {/* Forgot Password Link */}
                <a href="#" className="form-forgot" onClick={()=>SetisRegister(true)}>
                  Don't have an Account? SignUp
                </a>

                {/* Submit Button */}
                <input type="submit" value="Login" className="form-button" />
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

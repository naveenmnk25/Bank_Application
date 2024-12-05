import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PathConstants } from "../../routing/path-contants";
import "../../styles/Dashboard.scss";
import { fetchCustomerByIdEmail } from "../../redux/actions/CustomerAction";
import { useAuth } from "../../auth/auth";

function Dashboard() {
  const dispatch = useDispatch();
  const auth = useAuth();
  // Local loading state

  //--- State Data -------//
  const customer = useSelector((state) => state.customer.customer);

  //--- useEffect -------//
  useEffect(() => {
    console.log();
    var user = JSON.parse(auth.getuser());
    console.log("user : ", user);

    if (user) dispatch(fetchCustomerByIdEmail(user.email));
  }, [auth]);

  //----- Handle Data Changes Functions------//

  return (
    <>
      <div className="row m-0 p-0 ">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <div className="card p-3">
                {customer && (
                  <>
                    <h1 className="text-center">
                      Welcome {customer.firstName} {customer.lastName}
                    </h1>
                    <div className="row">
                      <div className="col-6 ">
                        <img
                          src="../src/assets/image/bank1.jpg"
                          alt="userimage"
                          height={"250px"}
                          width={"100%"}
                        />
                      </div>
                      <div className="col-6">
                        <table>
                          <tbody>
                            <tr>
                              <td>Email</td>
                              <td className="ps-2">
                                <b>{customer.email}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>DOB</td>
                              <td className="ps-2">
                                <b>{customer.dateOfBirth}</b>
                              </td>
                            </tr>
                            <tr>
                              <td>PhoneNumber</td>
                              <td className="ps-2">
                                <b>{customer.phoneNumber}</b>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="card"></div>
            </div>
          </div>
        </div>
        <div className="col-12 ">
          {/* <video autoPlay muted loop style={{ width: "100%", height: "auto" }}>
            <source src={image} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

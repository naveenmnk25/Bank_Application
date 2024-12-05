import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PathConstants } from "../../routing/path-contants";
import { useAuth } from "../../auth/auth";

function HeaderPage() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const [role, setRole] = useState(null);
  // Local loading state

  //--- State Data -------//
  // const companyList = useSelector((state) => state.company.companyList);

  //--- useEffect -------//
  useEffect(() => {
    if (auth) {
      var name = auth.getRole();
      setRole(name);
    }
  }, [auth]);

  //----- Handle Data Changes Functions------//
  const Logout = (e) => {
    auth.logout();
  };

  return (
    <>
      <section>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand " href="#">
              ABC
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav header-css1">
                <li className="nav-item">
                  <NavLink to={PathConstants.DASHBOARD} className="nav-link">
                    <i className="icon-home"></i> Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={PathConstants.CUSTOMER} className="nav-link">
                    <i className="icon-stack"></i> Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => Logout()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
              {role && (
                <>
                  <ul className="navbar-nav header-css1 text-end">
                    <li>
                      Welcome <b>{role}</b>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

export default HeaderPage;

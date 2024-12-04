import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PathConstants } from "../../routing/path-contants";

function HeaderPage() {
  const dispatch = useDispatch();

  // Local loading state

  //--- State Data -------//
 // const companyList = useSelector((state) => state.company.companyList);
  
  //--- useEffect -------//
  useEffect(() => {
    //dispatch(fetchCompany());
  }, [dispatch]);

  //----- Handle Data Changes Functions------//
  

  
  return (
    <>
      <section>
        <nav
          className="navbar navbar-expand-lg"
        >
          <div className="container-fluid">
            <a className="navbar-brand " href="#">
              ABC BANK
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
                  <NavLink
                    to={PathConstants.CUSTOMER}
                    className="nav-link"
                  >
                    <i className="icon-stack"></i> Customers
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

export default HeaderPage;
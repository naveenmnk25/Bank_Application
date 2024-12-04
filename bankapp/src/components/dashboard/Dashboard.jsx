import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PathConstants } from "../../routing/path-contants";

function Dashboard() {
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
      Dashboard
    </>
  );
}

export default Dashboard;
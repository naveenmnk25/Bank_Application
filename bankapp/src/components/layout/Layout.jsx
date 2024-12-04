import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import HeaderPage from './HeaderPage';


const Layout = () => {
  return (
    <Fragment>
      <HeaderPage />
        <Outlet />
    </Fragment>
  );
}

export default Layout;
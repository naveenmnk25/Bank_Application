import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Customer from "../components/customers/Customer";
import { PathConstants } from "./path-contants";
import Dashboard from "../components/dashboard/Dashboard";
import LoginPage from "../components/login/LoginPage";


const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path={PathConstants.DASHBOARD} element={<Dashboard />}></Route>
          <Route path={PathConstants.CUSTOMER} element={<Customer />}></Route>
          <Route path="*" element={<Dashboard />} />
        </Route>
        <Route path={PathConstants.LOGIN} element={<LoginPage />}></Route>
      </Routes>
    </>
  );
};

export default Root;
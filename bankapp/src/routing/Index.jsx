import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Customer from "../components/customers/Customer";
import { PathConstants } from "./path-contants";
import Dashboard from "../components/dashboard/Dashboard";
import LoginPage from "../components/login/LoginPage";
import { RequireAuth } from "../auth/RequireAuth";
import RedirectIfLoggedIn from "../auth/Auth.RedirectIfLoggedIn";

const Root = () => {
  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route
            index
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path={PathConstants.DASHBOARD}
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path={PathConstants.CUSTOMER}
            element={
              <RequireAuth>
                <Customer />
              </RequireAuth>
            }
          />
        </Route>

        {/* Public Routes */}
        <Route
          path={PathConstants.LOGIN}
          element={
            <RedirectIfLoggedIn>
              <LoginPage />
            </RedirectIfLoggedIn>
          }
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default Root;

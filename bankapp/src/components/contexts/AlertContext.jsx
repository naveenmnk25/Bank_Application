import React, { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ show: false, message: "", type: "info" });

  const showAlert = (message, type = "info", timeout = 3000) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ ...alert, show: false }), timeout);
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
      {children}
      {alert.show && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
          style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeAlert}
          ></button>
        </div>
      )}
    </AlertContext.Provider>
  );
};

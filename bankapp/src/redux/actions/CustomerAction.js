import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseapi } from "../../api/Api";

export const fetchCustomer = createAsyncThunk(
  "customer/fetchcustomer",
  async () => {
    try {
      const response = await baseapi.get("/Customer");
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

export const fetchCustomerByIdEmail = createAsyncThunk(
  "customer/fetchCustomerByIdEmail",
  async (mail) => {
    try {
      const response = await baseapi.get("/Customer/" + mail);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }

  }
);

export const addCustomer = createAsyncThunk(
  "customer/addcustomer",
  async (data) => {
    try {
      const response = await baseapi.post("Customer", data);
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updatecustomer",
  async (userData) => {
    try {
      const response = await baseapi.put(
        `Customer/${userData.customerId}`,
        userData
      );
      return response.data;
    } catch (error) {
      alert(error.response?.data?.message);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (userId) => {
    try {
      await baseapi.delete(`Customer/${userId}`);
      return userId;
    } catch (error) {
      alert(error.response?.data?.message);
      throw new Error("Failed to update customer: " + error.response.data);
    }
  }
);

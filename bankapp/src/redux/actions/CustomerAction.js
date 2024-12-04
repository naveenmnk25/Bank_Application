import {  createAsyncThunk } from '@reduxjs/toolkit';
import { baseapi } from '../../api/Api';

export const fetchCustomer = createAsyncThunk(
  'customer/fetchcustomer',
  async () => {
    const response = await baseapi.get('/Customer');
    return response.data;
  }
);

export const addCustomer = createAsyncThunk(
  'customer/addcustomer',
  async (data) => {
    const response = await baseapi.post('Customer', data);
    return response?.data;
  }
);

export const updateCustomer = createAsyncThunk(
  'customer/updatecustomer',
  async (userData) => {
    try {
      const response = await baseapi.put(`Customer/${userData.customerId}`, userData);
      return response.data;
    } catch (error) {     
     
      throw new Error('Failed to update customer');
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (userId) => {
    try {
      await baseapi.delete(`Customer/${userId}`);
      return userId;
    } catch (error) {     
      console.log(error);
      throw new Error('Failed to update customer: ' + error.response.data);
    }
  }
);
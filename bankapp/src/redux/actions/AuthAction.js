import {  createAsyncThunk } from '@reduxjs/toolkit';
import { baseapi } from '../../api/Api';

export const register = createAsyncThunk(
  'auth/register',
  async (data) => {
    const response = await baseapi.post('/Auth/register',data);
    return response.data;
  }
);

export const Userlogin1 = createAsyncThunk(
  'auth/login',
  async (data) => {
    const response = await baseapi.post(`/Auth/Login?Email=${data.username}&Password=${data.password}`);
    console.log("response : ", response);
    return response.data;
  }
);

export const Userlogin = async (data) => {
  try {
    const response = await baseapi.post(`/Auth/Login?Email=${data.username}&Password=${data.password}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching price chart graph data:', error);
    throw error;
  }
};
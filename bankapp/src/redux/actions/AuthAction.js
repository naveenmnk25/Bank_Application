import {  createAsyncThunk } from '@reduxjs/toolkit';
import { baseapi } from '../../api/Api';
import { useAlert } from '../../components/contexts/AlertContext';

const { showAlert } = useAlert();


export const register = createAsyncThunk(
  'auth/register',
  async (data) => {
    try {
    const response = await baseapi.post('/Auth/register',data);
    showAlert("The Component Name is Empty !", "danger", 4000);
    return response.data;

    } catch (error) {
      showAlert(error.response.data.message, "danger", 4000);
      console.log("erroe",error);
      
    }
  }
);

export const Userlogin1 = createAsyncThunk(
  'auth/login',
  async (data) => {
    const response = await baseapi.post(`/Auth/Login?Email=${data.username}&Password=${data.password}`);
    console.log("response : ", response);
    showAlert("The Component Name is Empty !", "danger", 4000);
    return response.data;
  }
);

export const Userlogin = async (data) => {
  try {
    const response = await baseapi.post(`/Auth/Login?Email=${data.username}&Password=${data.password}`);
    showAlert("The Component Name is Empty !", "danger", 4000);
    return response.data;

    } catch (error) {
      showAlert(error.response.data.message, "danger", 4000);
      console.log("erroe",error);
      
    }  
};
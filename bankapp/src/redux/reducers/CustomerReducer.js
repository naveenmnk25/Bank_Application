
import { createSlice } from '@reduxjs/toolkit';
import { addCustomer, deleteCustomer, fetchCustomer, fetchCustomerByIdEmail, updateCustomer } from '../actions/CustomerAction';

const initialState = {
  customerList: null,
  customer: null,
  status: 'idle',
  error: null
};

const customerSlice = createSlice({
  name: 'customer',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.status = 'loading'; 
        state.customerList=null;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerList = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.customerList=null;
      })

      .addCase(fetchCustomerByIdEmail.pending, (state) => {
        state.status = 'loading'; 
        state.customer=null;
      })
      .addCase(fetchCustomerByIdEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customer = action.payload;
      })
      .addCase(fetchCustomerByIdEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.customer=null;
      })

      // Add Customer Value
      .addCase(addCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customerList = [...state.customerList, action.payload];
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Update Customer Value
      .addCase(updateCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.customerList.findIndex(el => el.customerId === action.payload.customerId);
        if (index !== -1) {
          state.customerList[index] = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete Customer Value
      .addCase(deleteCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cssClasss.data = state.cssClasss.data.filter(el => el.customerId !== action.meta.arg);
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default customerSlice.reducer;
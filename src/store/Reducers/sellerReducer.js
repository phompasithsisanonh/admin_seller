import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/request-seller-get`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
///only one seller
export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async ({ sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

//update seller active
export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
//update seller active
export const statusVerify = createAsyncThunk(
  "seller/statusVerify",
  async (
    { sellerId, statusverified, rejectionReason },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post(
        `/statusverified`,
        {
          sellerId: sellerId,
          statusverified: statusverified,
          rejectionReason: rejectionReason,
        },
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_success_payment = createAsyncThunk(
  "seller/get_success_payment ",
  async ({ sellId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get_success_payment/${sellId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const confirm_payment = createAsyncThunk(
  "seller/confirm_payment",
  async ({ id, payment_status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/confirmed/${id}`,
        { payment_status },
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const confirm_payment_delivery = createAsyncThunk(
  "seller/confirm_payment_delivery",
  async ({ id, delivery_status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/confirmed_delivery/${id}`,
        { delivery_status },
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const dash = createAsyncThunk(
  "seller/dash",
  async ({ sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/dash/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const transation = createAsyncThunk(
  "seller/transation ",
  async ({ sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/transaction/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_tranfer = createAsyncThunk(
  "seller/get_tranfer",
  async ({ sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get_amount/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const tranfer = createAsyncThunk(
  "seller/tranfer",
  async (
    { sellerId, bank, seller_name_bank, amount, seller_account_bank_number },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post(
        `/tranfer/${sellerId}`,
        {
          bank,
          seller_name_bank,
          amount,
          seller_account_bank_number,
        },
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: "",
    ///
    get_success_payments: [],
    data: [],
    ///
    dash_seller: [],
    //
    amount_seller: [],
    //
    get_amount: [],
    totalPending: 0,
    totalSuccess: 0,
    totalCancel: 0,
    pendingItems: [],
    successItems: [],
    cencelItems: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_request.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })
      .addCase(get_seller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })
      //update active seller
      .addCase(seller_status_update.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message;
      })
      .addCase(get_success_payment.fulfilled, (state, { payload }) => {
        state.get_success_payments = payload.authId;
        // state.data = payload.data;
        state.successMessage = payload.message;
      })
      ///confrim
      .addCase(confirm_payment.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(confirm_payment.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(confirm_payment.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(confirm_payment_delivery.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(confirm_payment_delivery.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(confirm_payment_delivery.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(dash.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.dash_seller = payload.dash;
      })
      .addCase(transation.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.amount_seller = payload.data;
      })
      .addCase(tranfer.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(tranfer.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(tranfer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(get_tranfer.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.get_amount = payload.data;
        state.totalPending = payload.totalPending;
        state.totalSuccess = payload.totalSuccess;
        state.totalCancel = payload.totalCancel;

        state.pendingItems = payload.pendingItems;
        state.successItems = payload.successItems;
        state.cencelItems = payload.cencelItems;
      })

      .addCase(statusVerify.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(statusVerify.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(statusVerify.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      });
  },
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_wallet = createAsyncThunk(
  "wallet/get_wallet",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-wallet", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const walletReducer = createSlice({
  name: "wallet",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    wallet:[]
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(get_wallet.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.wallet = payload.data;
    });
  },
});
export const { messageClear } = walletReducer.actions;
export default walletReducer.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const chat_get_admin = createAsyncThunk(
  "chat/chat_get_admin",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get_admin_messages`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    get_admin: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(chat_get_admin.fulfilled, (state, { payload }) => {
      state.get_admin = payload.message;
    });
  },
});
export const { messageClear } = chatReducer.actions;
export default chatReducer.reducer;

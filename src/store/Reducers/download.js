import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const download_excel = createAsyncThunk(
    "download/download_excel",
    async ({ model }, { rejectWithValue, fulfillWithValue }) => {
      try {
        // ใช้ GET และใส่ responseType ที่ถูกต้อง
        const response = await api.get(`/download/${model}`, {
          responseType: "blob", // ต้องกำหนดที่นี่
        });
  
        // สร้าง URL สำหรับดาวน์โหลด
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${model}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        return fulfillWithValue(response.data);
      } catch (error) {
        return rejectWithValue(error.response?.data || "เกิดข้อผิดพลาด");
      }
    }
  );

export const download = createSlice({
  name: "download",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(download_excel.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.dataExcel = payload.data;
    });
  },
});
export const { messageClear } = download.actions;
export default download.reducer;

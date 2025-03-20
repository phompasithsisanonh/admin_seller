import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const coupon_add = createAsyncThunk(
  "coupon/coupon_add",
  async (
    {
      code, // 🔹 รหัสคูปอง เช่น 'DISCOUNT50'
      type, // 🔹 ประเภทของคูปอง ('percentage' = ลดเป็นเปอร์เซ็นต์, 'fixed' = ลดเป็นจำนวนเงิน)
      value, // 🔹 มูลค่าส่วนลด (เช่น 10% หรือ 100 บาท)
      minPurchase, // 🔹 ยอดซื้อขั้นต่ำที่ใช้คูปองได้ (เช่น ต้องซื้อขั้นต่ำ 500 บาท)
      maxDiscount, // 🔹 จำนวนเงินลดสูงสุดที่ใช้ได้ (เช่น ลดได้สูงสุด 200 บาท)
      startDate, // 🔹 วันเริ่มต้นที่คูปองสามารถใช้ได้ (เช่น '2024-03-01')
      endDate, // 🔹 วันหมดอายุของคูปอง (เช่น '2024-03-31')
      status, // 🔹 สถานะของคูปอง ('active' = ใช้งานได้, 'expired' = หมดอายุ, 'disabled' = ปิดใช้งาน)
      usageLimit, // 🔹 จำนวนครั้งที่คูปองสามารถใช้ได้ทั้งหมด (เช่น 100 ครั้ง)
      applicableCategories, // 🔹 รายการหมวดหมู่สินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['electronics', 'clothing'])
      applicableProducts, // 🔹 รายการสินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['product123', 'product456'])
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post(
        `/coupon-add`,
        {
          code, // 🔹 รหัสคูปอง เช่น 'DISCOUNT50'
          type, // 🔹 ประเภทของคูปอง ('percentage' = ลดเป็นเปอร์เซ็นต์, 'fixed' = ลดเป็นจำนวนเงิน)
          value, // 🔹 มูลค่าส่วนลด (เช่น 10% หรือ 100 บาท)
          minPurchase, // 🔹 ยอดซื้อขั้นต่ำที่ใช้คูปองได้ (เช่น ต้องซื้อขั้นต่ำ 500 บาท)
          maxDiscount, // 🔹 จำนวนเงินลดสูงสุดที่ใช้ได้ (เช่น ลดได้สูงสุด 200 บาท)
          startDate, // 🔹 วันเริ่มต้นที่คูปองสามารถใช้ได้ (เช่น '2024-03-01')
          endDate, // 🔹 วันหมดอายุของคูปอง (เช่น '2024-03-31')
          status, // 🔹 สถานะของคูปอง ('active' = ใช้งานได้, 'expired' = หมดอายุ, 'disabled' = ปิดใช้งาน)
          usageLimit, // 🔹 จำนวนครั้งที่คูปองสามารถใช้ได้ทั้งหมด (เช่น 100 ครั้ง)
          applicableCategories, // 🔹 รายการหมวดหมู่สินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['electronics', 'clothing'])
          applicableProducts, // 🔹 รายการสินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['product123', 'product456'])
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const coupon_get = createAsyncThunk(
  "coupon/coupon_get",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-coupon`, {
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
export const coupon_edit = createAsyncThunk(
  "coupon/coupon_edit",
  async (
    {
      couponId,
      code, // 🔹 รหัสคูปอง เช่น 'DISCOUNT50'
      type, // 🔹 ประเภทของคูปอง ('percentage' = ลดเป็นเปอร์เซ็นต์, 'fixed' = ลดเป็นจำนวนเงิน)
      value, // 🔹 มูลค่าส่วนลด (เช่น 10% หรือ 100 บาท)
      minPurchase, // 🔹 ยอดซื้อขั้นต่ำที่ใช้คูปองได้ (เช่น ต้องซื้อขั้นต่ำ 500 บาท)
      maxDiscount, // 🔹 จำนวนเงินลดสูงสุดที่ใช้ได้ (เช่น ลดได้สูงสุด 200 บาท)
      startDate, // 🔹 วันเริ่มต้นที่คูปองสามารถใช้ได้ (เช่น '2024-03-01')
      endDate, // 🔹 วันหมดอายุของคูปอง (เช่น '2024-03-31')
      status, // 🔹 สถานะของคูปอง ('active' = ใช้งานได้, 'expired' = หมดอายุ, 'disabled' = ปิดใช้งาน)
      usageLimit, // 🔹 จำนวนครั้งที่คูปองสามารถใช้ได้ทั้งหมด (เช่น 100 ครั้ง)
      applicableCategories, // 🔹 รายการหมวดหมู่สินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['electronics', 'clothing'])
      applicableProducts, // 🔹 รายการสินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['product123', 'product456'])
    },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.put(
        `/couponEdit`,
        {
          couponId,
          code, // 🔹 รหัสคูปอง เช่น 'DISCOUNT50'
          type, // 🔹 ประเภทของคูปอง ('percentage' = ลดเป็นเปอร์เซ็นต์, 'fixed' = ลดเป็นจำนวนเงิน)
          value, // 🔹 มูลค่าส่วนลด (เช่น 10% หรือ 100 บาท)
          minPurchase, // 🔹 ยอดซื้อขั้นต่ำที่ใช้คูปองได้ (เช่น ต้องซื้อขั้นต่ำ 500 บาท)
          maxDiscount, // 🔹 จำนวนเงินลดสูงสุดที่ใช้ได้ (เช่น ลดได้สูงสุด 200 บาท)
          startDate, // 🔹 วันเริ่มต้นที่คูปองสามารถใช้ได้ (เช่น '2024-03-01')
          endDate, // 🔹 วันหมดอายุของคูปอง (เช่น '2024-03-31')
          status, // 🔹 สถานะของคูปอง ('active' = ใช้งานได้, 'expired' = หมดอายุ, 'disabled' = ปิดใช้งาน)
          usageLimit, // 🔹 จำนวนครั้งที่คูปองสามารถใช้ได้ทั้งหมด (เช่น 100 ครั้ง)
          applicableCategories, // 🔹 รายการหมวดหมู่สินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['electronics', 'clothing'])
          applicableProducts, // 🔹 รายการสินค้าที่สามารถใช้คูปองนี้ได้ (เช่น ['product123', 'product456'])
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const couponReducer = createSlice({
  name: "coupon",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    get_admin: [],
    get_coupon: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(coupon_add.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(coupon_add.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(coupon_add.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })
      .addCase(coupon_get.fulfilled, (state, { payload }) => {
        state.get_coupon = payload.data;
      })
      .addCase(coupon_edit.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(coupon_edit.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(coupon_edit.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      });
  },
});
export const { messageClear } = couponReducer.actions;
export default couponReducer.reducer;

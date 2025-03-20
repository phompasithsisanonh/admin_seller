import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
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
export const get_category = createAsyncThunk(
  "category/get_category",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/category-get`, {
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
export const updatecategoryAdd = createAsyncThunk(
  "category/updatecategoryAdd ",
  async (
    { oldImage, newImage, categorysId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      // Ensure newImage is a File
      if (!(newImage instanceof File)) {
        return rejectWithValue({ message: "newImage must be a file" });
      }

      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("categorysId", categorysId);

      // Log the FormData (for debugging)
      console.log("FormData being sent:", formData);
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      if (!(newImage instanceof File)) {
        return rejectWithValue({ message: "newImage ต้องเป็นไฟล์" });
      }
      const { data } = await api.post("/updatecategoryAdd", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log("Response data:", data);
      return fulfillWithValue(data);
    } catch (error) {
      // Log error to get more insights
      console.error("Error uploading image:", error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);
export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categorys: [],
    totalCategory: 0,
    parPage: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(categoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(categoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categorys = [...state.categorys, payload.category];
      })
      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.totalCategory = payload.totalCategory;
        state.categorys = payload.categorys;
        // state.parPage = payload.parPage;
      })
      .addCase(updatecategoryAdd.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updatecategoryAdd.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(updatecategoryAdd.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      });
  },
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_product = createAsyncThunk(
  "product/add_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-add", product, {
        withCredentials: true,
      });
      // console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_products = createAsyncThunk(
  "product/get_products",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const {
        data,
      } = await api.get(
        `/products-get?searchValue=${encodeURIComponent(
          searchValue
        )}&page=${page}`,
        { withCredentials: true }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
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
export const update_product = createAsyncThunk(
  "product/update_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-update", product, {
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
export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async (
    { oldImage, newImage, productId },
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
      formData.append("productId", productId);

      // Log the FormData (for debugging)
      console.log("FormData being sent:", formData);
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      if (!(newImage instanceof File)) {
        return rejectWithValue({ message: "newImage ต้องเป็นไฟล์" });
      }
      const { data } = await api.post("/product-image-update", formData, {
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
////banner
export const get_products_admin_seller = createAsyncThunk(
  "product/get_products_admin_seller",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get_products_admin_seller`, {
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

////banner_add
export const banner_add = createAsyncThunk(
  "product/banner_add",
  async (formData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/add_banner", formData, {
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
//get_banner
export const get_banner = createAsyncThunk(
  "product/get_banner",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get_banner/${productId}`, {
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
///delete_banner
export const delete_banner = createAsyncThunk(
  "product/delete_banner",
  async ({ productId, index }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/delete/${productId}/${index}`, {
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
///ປ່ຽນສະຖານະ ຂາຍ ຢຸດຂາຍ
export const status_buyOrstopbuy = createAsyncThunk(
  "product/status_buyOrstopbuy",
  async ({ productId, newStatus }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/status_buy/${productId}`,
        { newStatus },
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

///dashbord
export const dashbord = createAsyncThunk(
  "product/dashbord ",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/dashbord_admin`, {
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
export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    product: "", /// for get get_product
    totalProduct: 0,
    parPage: 0,
    ///banner
    banners: [], //get_products
    /////
    get_banners: [],
    //dashbord
    total_sales: [],
    pending_orders: [],
    paid_orders: [],
    all_products: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_product.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.products = payload.products;
        state.parPage = payload.parPage;
      })
      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.product = payload.product;
      })
      .addCase(update_product.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })
      .addCase(product_image_update.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.successMessage = payload.message;
      })

      .addCase(get_products_admin_seller.fulfilled, (state, { payload }) => {
        state.banners = payload.data;
      })
      .addCase(banner_add.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(banner_add.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(banner_add.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(get_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.get_banners = payload.get_banners;
      })
      .addCase(delete_banner.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(delete_banner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(delete_banner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      /////buy or stop buy
      .addCase(status_buyOrstopbuy.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(status_buyOrstopbuy.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(status_buyOrstopbuy.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
      .addCase(dashbord.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(dashbord.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(dashbord.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.total_sales = payload.data.total_sales;
        state.pending_orders = payload.data.pending_orders;
        state.paid_orders = payload.data.paid_orders;
        state.all_products = payload.data.all_products;
      });
  },
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/product/recommendation");
      const { recommended_products, accuracy } = response.data;
      return { recommended_products, accuracy };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const filterProducts = createAsyncThunk(
  "product/filterProducts",
  async ({ searchKey, sortKey, category }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/product");
      let filteredProducts = response.data;

      if (searchKey) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchKey.toLowerCase())
        );
      }

      if (category !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
      }

      if (sortKey === "htl") {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortKey === "lth") {
        filteredProducts.sort((a, b) => a.price - b.price);
      }

      return filteredProducts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProductReview = createAsyncThunk(
  "product/addProductReview",
  async ({ review, productid }, { rejectWithValue, getState }) => {
    try {
      const currentUser = getState().loginReducer.currentUser;

      const data = {
        rating: review.rating,
        comment: review.comment,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.jwtToken,
      };

      const response = await axios.post(
        `/api/review/create/${productid}`,
        data,
        { headers }
      );

      if (response.status !== 200) {
        throw new Error("Error");
      }

      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (productid, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/product/${productid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productid, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/product/${productid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/product", product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ product }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/product/${product.id}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    accuracy: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.recommended_products;
        state.accuracy = action.payload.accuracy;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(filterProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProductReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.log("updateProduct rejected reducer:", action.meta.arg);
        try {
          const response = axios.put(
            `/api/product/${action.meta.arg.id}`,
            action.meta.arg
          );
        } catch (error) {
          console.log(error);
        }
        state.loading = true;
        state.error = action.meta.arg;
      });
  },
});

export default productSlice.reducer;

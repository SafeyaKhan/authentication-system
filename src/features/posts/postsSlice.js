import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axiosInstance.get("/v2/post/get_my_post"); // Adjust endpoint as needed
  return response.data.data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData) => {
    const response = await axiosInstance.post(
      "/api/post/create_post",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || []; // Make sure to set items
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Create post
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;

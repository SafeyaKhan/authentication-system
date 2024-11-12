import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState }) => {
    const { token } = getState().auth;
    const response = await axiosInstance.get("/v2/users/my_details", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (updatedData, { getState }) => {
    const { token } = getState().auth;
    const response = await axiosInstance.put("/api/user", updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;

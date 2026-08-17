import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/authServices";

const initialState = {
  user: null,
  accessToken: null,

  isAuthenticated: false,
  isInitialized: false,

  isLoading: false,

  error: null,
};

// =========================
// Initialize Authentication
// =========================
export const initializeAuth = createAsyncThunk(
  "auth/initialize",
  async (_, thunkAPI) => {
    try {
      const rememberMe =
        localStorage.getItem("rememberMe") ===
        "true";

      const storage = rememberMe
        ? localStorage
        : sessionStorage;

      const accessToken =
        storage.getItem("accessToken");

      if (!accessToken) {
        return null;
      }

      const user =
        await authService.getCurrentUser();

      return {
        user,
        accessToken,
      };
    } catch (error) {
      console.error(error);

      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("rememberMe");

      return thunkAPI.rejectWithValue(null);
    }
  }
);

// =========================
// Login
// =========================
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;

      state.isAuthenticated = false;
      state.isInitialized = false;

      state.error = null;

      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("rememberMe");
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // Initialize Authentication
      // =========================

      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;

        if (action.payload) {
          state.user = action.payload.user;
          state.accessToken = action.payload.accessToken;
          state.isAuthenticated = true;
        }
      })

      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
      })

      // =========================
      // Login
      // =========================

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

.addCase(login.fulfilled, (state, action) => {
  const { user, accessToken } = action.payload;

  state.isLoading = false;
  state.user = user;
  state.accessToken = accessToken;
  state.isAuthenticated = true;
  state.isInitialized = true;
  state.error = null;
})

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
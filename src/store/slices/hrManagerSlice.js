import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hrManagerService from "../../services/hrManagerServices";

const initialState = {
  hrManagers: [],
  total: 0,

  selectedHRManager: null,

  isLoading: false,
  error: null,
};

// ==========================
// GET HR MANAGERS
// ==========================

export const getHRManagers = createAsyncThunk(
  "hrManagers/getHRManagers",

  async (_, thunkAPI) => {
    try {
      return await hrManagerService.getHRManagers();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch HR Managers"
      );
    }
  }
);
export const createHRManager = createAsyncThunk(
  "hrManager/createHRManager",

  async (hrManagerData, thunkAPI) => {
    try {
      return await hrManagerService.createHRManager(
        hrManagerData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create HR Manager"
      );
    }
  }
);
export const changeHRManagerStatus =
  createAsyncThunk(
    "hrManager/changeStatus",

    async (
      { employeeId, status },
      thunkAPI
    ) => {
      try {
        return await hrManagerService.changeHRManagerStatus(
          employeeId,
          status
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to change status"
        );
      }
    }
  );

export const getHRManagerById = createAsyncThunk(
  "hrManager/getHRManagerById",

  async (employeeId, thunkAPI) => {
    try {
      return await hrManagerService.getHRManagerById(
        employeeId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch HR Manager"
      );
    }
  }
);
const hrManagerSlice = createSlice({
  name: "hrManager",

  initialState,

  reducers: {
    clearHRManagerError(state) {
      state.error = null;
    },

    clearSelectedHRManager(state) {
      state.selectedHRManager = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // GET HR MANAGERS
      // ==========================

      .addCase(getHRManagers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        getHRManagers.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.hrManagers =
            action.payload.items;

          state.total =
            action.payload.count;
        }
      )

      .addCase(
        getHRManagers.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      // ==========================
// CREATE HR MANAGER
// ==========================

.addCase(createHRManager.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(createHRManager.fulfilled, (state) => {
  state.isLoading = false;
})

.addCase(createHRManager.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
// ==========================
// CHANGE STATUS
// ==========================

.addCase(changeHRManagerStatus.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(
  changeHRManagerStatus.fulfilled,
  (state, action) => {
    state.isLoading = false;

    const index =
      state.hrManagers.findIndex(
        (manager) =>
          manager.employee_id ===
          action.payload.employee_id
      );

    if (index !== -1) {
      state.hrManagers[index] = {
        ...state.hrManagers[index],
        ...action.payload,
      };
    }
  }
)

.addCase(
  changeHRManagerStatus.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
// ==========================
// GET HR MANAGER BY ID
// ==========================

.addCase(getHRManagerById.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(getHRManagerById.fulfilled, (state, action) => {
  state.isLoading = false;
  state.selectedHRManager = action.payload;
})

.addCase(getHRManagerById.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
  },
});

export const {
  clearHRManagerError,
  clearSelectedHRManager,
} = hrManagerSlice.actions;

export default hrManagerSlice.reducer;
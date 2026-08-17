import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import departmentService from "../../services/departmentServices";

const initialState = {
  departments: [],
  total: 0,

  selectedDepartment: null,

  isLoading: false,
  error: null,
};

export const getDepartments =
  createAsyncThunk(
    "department/getDepartments",

    async (_, thunkAPI) => {
      try {
        return await departmentService.getDepartments();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch departments"
        );
      }
    }
  );
export const createDepartment = createAsyncThunk(
  "department/createDepartment",

  async (departmentData, thunkAPI) => {
    try {
      return await departmentService.createDepartment(
        departmentData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create department"
      );
    }
  }
);
export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",

  async ({ departmentId, departmentData }, thunkAPI) => {
    try {
      return await departmentService.updateDepartment(
        departmentId,
        departmentData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to update department"
      );
    }
  }
);
export const getDepartmentById = createAsyncThunk(
  "department/getDepartmentById",

  async (departmentId, thunkAPI) => {
    try {
      return await departmentService.getDepartmentById(
        departmentId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch department"
      );
    }
  }
);
export const changeDepartmentStatus =
  createAsyncThunk(
    "department/changeDepartmentStatus",

    async (
      { departmentId, isActive },
      thunkAPI
    ) => {
      try {
        return await departmentService.changeDepartmentStatus(
          departmentId,
          isActive
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to change department status"
        );
      }
    }
  );
const departmentSlice = createSlice({
  name: "department",

  initialState,

  reducers: {
    clearDepartmentError(state) {
      state.error = null;
    },

    clearSelectedDepartment(state) {
      state.selectedDepartment = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        getDepartments.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getDepartments.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.departments =
            action.payload.data;

          state.total =
            action.payload.meta.total;
        }
      )

      .addCase(
        getDepartments.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error = action.payload;
        }
      )
      .addCase(createDepartment.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(createDepartment.fulfilled, (state, action) => {
  state.isLoading = false;

  state.departments.unshift(
    action.payload.department
  );

  state.total += 1;
})

.addCase(createDepartment.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(updateDepartment.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(updateDepartment.fulfilled, (state) => {
  state.isLoading = false;
})

.addCase(updateDepartment.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
//get department by id
.addCase(getDepartmentById.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(
  getDepartmentById.fulfilled,
  (state, action) => {
    state.isLoading = false;
    state.selectedDepartment =
      action.payload;
  }
)

.addCase(
  getDepartmentById.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
//change departmen status
.addCase(
  changeDepartmentStatus.fulfilled,
  (state, action) => {
    state.isLoading = false;

    const { departmentId } =
      action.meta.arg;

    const department =
      state.departments.find(
        (d) => d.id === departmentId
      );

    if (department) {
      department.is_active =
        action.payload.is_active;
    }

    if (
      state.selectedDepartment &&
      state.selectedDepartment.id ===
        departmentId
    ) {
      state.selectedDepartment.is_active =
        action.payload.is_active;
    }
  }
)

.addCase(
  changeDepartmentStatus.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  changeDepartmentStatus.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
);
  },
});

export const {
  clearDepartmentError,
  clearSelectedDepartment,
} = departmentSlice.actions;

export default departmentSlice.reducer;
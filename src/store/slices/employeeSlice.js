import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import employeeService from "../../services/employeeService";

const initialState = {
  employees: [],
  total: 0,
  myProfile: null,

  selectedEmployee: null,
  employeeManager: null,
  subordinates: [],
  totalSubordinates: 0,
  isLoading: false,
  error: null,
};

export const getEmployees = createAsyncThunk(
  "employee/getEmployees",

  async (_, thunkAPI) => {
    try {
      return await employeeService.getEmployees();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch employees"
      );
    }
  }
);

export const getEmployeeById =
  createAsyncThunk(
    "employee/getEmployeeById",

    async (employeeId, thunkAPI) => {
      try {
        return await employeeService.getEmployeeById(
          employeeId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch employee"
        );
      }
    }
  );

export const createEmployee =
  createAsyncThunk(
    "employee/createEmployee",

    async (employeeData, thunkAPI) => {
      try {
        return await employeeService.createEmployee(
          employeeData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to create employee"
        );
      }
    }
  );
export const updateEmployeeProfile =
  createAsyncThunk(
    "employee/updateEmployeeProfile",

    async (
      { employeeId, profileData },
      thunkAPI
    ) => {
      try {
        return await employeeService.updateEmployeeProfile(
          employeeId,
          profileData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update employee profile"
        );
      }
    }
  );
  export const getMyProfile = createAsyncThunk(
  "employee/getMyProfile",

  async (_, thunkAPI) => {
    try {
      return await employeeService.getMyProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch profile"
      );
    }
  }
);
export const updateMyProfile = createAsyncThunk(
  "employee/updateMyProfile",

  async (profileData, thunkAPI) => {
    try {
      return await employeeService.updateMyProfile(
        profileData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  }
);

export const assignDepartment = createAsyncThunk(
  "employee/assignDepartment",

  async (
    { employeeId, departmentId },
    thunkAPI
  ) => {
    try {
      return await employeeService.assignDepartment(
        employeeId,
        departmentId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to assign department"
      );
    }
  }
);

export const assignDesignation =
  createAsyncThunk(
    "employee/assignDesignation",

    async (
      {
        employeeId,
        designationId,
      },
      thunkAPI
    ) => {
      try {
        return await employeeService.assignDesignation(
          employeeId,
          designationId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to assign designation"
        );
      }
    }
  );

  export const assignManager = createAsyncThunk(
  "employee/assignManager",

  async (
    {
      employeeId,
      managerId,
    },
    thunkAPI
  ) => {
    try {
      return await employeeService.assignManager(
        employeeId,
        managerId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to assign manager"
      );
    }
  }
);

export const getEmployeeManager =
  createAsyncThunk(
    "employee/getEmployeeManager",

    async (employeeId, thunkAPI) => {
      try {
        return await employeeService.getEmployeeManager(
          employeeId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch employee manager"
        );
      }
    }
  );
  export const getEmployeeSubordinates =
  createAsyncThunk(
    "employee/getEmployeeSubordinates",

    async (managerId, thunkAPI) => {
      try {
        return await employeeService.getEmployeeSubordinates(
          managerId
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch subordinates"
        );
      }
    }
  );
const employeeSlice = createSlice({
  name: "employee",

  initialState,

  reducers: {
    clearEmployeeError(state) {
      state.error = null;
    },

    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // GET EMPLOYEES
      // =========================

      .addCase(
        getEmployees.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        getEmployees.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.employees =
            action.payload.employees;

          state.total =
            action.payload.count;
        }
      )

      .addCase(
        getEmployees.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error = action.payload;
        }
      )

      // =========================
      // GET EMPLOYEE BY ID
      // =========================

      .addCase(
        getEmployeeById.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.selectedEmployee = null;
        }
      )

      .addCase(
        getEmployeeById.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.selectedEmployee =
            action.payload;
        }
      )

      .addCase(
        getEmployeeById.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error = action.payload;
        }
      )

      // =========================
      // CREATE EMPLOYEE
      // =========================

      .addCase(
        createEmployee.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addCase(
        createEmployee.fulfilled,
        (state) => {
          state.isLoading = false;
        }
      )

      .addCase(
        createEmployee.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error = action.payload;
        }
      )
      // update employee profile BY HR/owner
      .addCase(
  updateEmployeeProfile.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  updateEmployeeProfile.fulfilled,
  (state) => {
    state.isLoading = false;
  }
)

.addCase(
  updateEmployeeProfile.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
// =========================
// GET MY PROFILE
// =========================

.addCase(
  getMyProfile.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  getMyProfile.fulfilled,
  (state, action) => {
    state.isLoading = false;
    state.myProfile = action.payload;
  }
)

.addCase(
  getMyProfile.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)

// =========================
// UPDATE MY PROFILE
// =========================

.addCase(
  updateMyProfile.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  updateMyProfile.fulfilled,
  (state) => {
    state.isLoading = false;
  }
)

.addCase(
  updateMyProfile.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
//assign department to employee
.addCase(
  assignDepartment.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  assignDepartment.fulfilled,
  (state, action) => {
    state.isLoading = false;

    if (state.selectedEmployee) {
      state.selectedEmployee.department = {
        id: action.payload.department_id,
        name: action.payload.department_name,
      };
    }
  }
)

.addCase(
  assignDepartment.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
//assign designation to employee
.addCase(
  assignDesignation.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  assignDesignation.fulfilled,
  (state, action) => {
    state.isLoading = false;

    if (state.selectedEmployee) {
      state.selectedEmployee.designation = {
        id: action.payload.designation_id,
        title: action.payload.designation_title,
      };
    }
  }
)

.addCase(
  assignDesignation.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
//assign manager to employee
.addCase(
  assignManager.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  assignManager.fulfilled,
  (state, action) => {
    state.isLoading = false;

    const {
      employeeId,
      managerId,
    } = action.meta.arg;

    /*
     * Update employee in employees list
     */
    const employee =
      state.employees.find(
        (employee) =>
          employee.id ===
          Number(employeeId)
      );

    if (employee) {
      const manager =
        state.employees.find(
          (employee) =>
            employee.id ===
            Number(managerId)
        );

      if (manager) {
        employee.manager = {
          id: manager.id,
          employee_code:
            manager.employee_code,
          first_name:
            manager.first_name,
          last_name:
            manager.last_name,
        };
      }
    }

    /*
     * Update selected employee
     */
    if (
      state.selectedEmployee &&
      state.selectedEmployee.id ===
        Number(employeeId)
    ) {
      const manager =
        state.employees.find(
          (employee) =>
            employee.id ===
            Number(managerId)
        );

      if (manager) {
        state.selectedEmployee.manager = {
          id: manager.id,
          employee_code:
            manager.employee_code,
          first_name:
            manager.first_name,
          last_name:
            manager.last_name,
        };
      }
    }
  }
)

.addCase(
  assignManager.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
//get employee manager details
.addCase(
  getEmployeeManager.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  getEmployeeManager.fulfilled,
  (state, action) => {
    state.isLoading = false;

    state.employeeManager =
      action.payload.manager;
  }
)

.addCase(
  getEmployeeManager.rejected,
  (state, action) => {
    state.isLoading = false;

    state.error = action.payload;
  }
)
//get employee subordinates
.addCase(
  getEmployeeSubordinates.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  getEmployeeSubordinates.fulfilled,
  (state, action) => {
    state.isLoading = false;

    state.subordinates =
      action.payload.subordinates || [];

    state.totalSubordinates =
      action.payload.total_subordinates || 0;
  }
)

.addCase(
  getEmployeeSubordinates.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
  },
});

export const {
  clearEmployeeError,
  clearSelectedEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
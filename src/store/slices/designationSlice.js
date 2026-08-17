import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import designationService from "../../services/designationService";
const initialState = {
  designations: [],
  total: 0,

  selectedDesignation: null,

  isLoading: false,
  error: null,
};

export const getDesignations =
  createAsyncThunk(
    "designation/getDesignations",

    async (_, thunkAPI) => {
      try {
        return await designationService.getDesignations();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch designations"
        );
      }
    }
  );
  export const getDesignationById = createAsyncThunk(
  "designation/getDesignationById",

  async (designationId, thunkAPI) => {
    try {
      return await designationService.getDesignationById(
        designationId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch designation"
      );
    }
  }
);
export const createDesignation =
  createAsyncThunk(
    "designation/createDesignation",

    async (designationData, thunkAPI) => {
      try {
        return await designationService.createDesignation(
          designationData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to create designation"
        );
      }
    }
  );
  export const updateDesignation =
  createAsyncThunk(
    "designation/updateDesignation",

    async (
      { designationId, designationData },
      thunkAPI
    ) => {
      try {
        return await designationService.updateDesignation(
          designationId,
          designationData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update designation"
        );
      }
    }
  );
const designationSlice = createSlice({
  name: "designation",

  initialState,

 reducers: {
  clearDesignationError(state) {
    state.error = null;
  },

  clearSelectedDesignation(state) {
    state.selectedDesignation = null;
  },
},

  extraReducers: (builder) => {
  builder

//get list
.addCase(
  getDesignations.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  getDesignations.fulfilled,
  (state, action) => {
    state.isLoading = false;

    state.designations =
      action.payload.items;

    state.total =
      action.payload.total;
  }
)

.addCase(
  getDesignations.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
// create designation
.addCase(
  createDesignation.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  createDesignation.fulfilled,
  (state, action) => {
    state.isLoading = false;

    state.designations.unshift(
      action.payload.designation
    );

    state.total += 1;
  }
)

.addCase(
  createDesignation.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
//update designation 
.addCase(
  updateDesignation.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  updateDesignation.fulfilled,
  (state) => {
    state.isLoading = false;
  }
)

.addCase(
  updateDesignation.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)
//get designation by id
.addCase(
  getDesignationById.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
  }
)

.addCase(
  getDesignationById.fulfilled,
  (state, action) => {
    state.isLoading = false;

    state.selectedDesignation =
      action.payload.designation;
  }
)

.addCase(
  getDesignationById.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)


  },
});

export const {
  clearDesignationError,
  clearSelectedDesignation,
} = designationSlice.actions;

export default designationSlice.reducer;
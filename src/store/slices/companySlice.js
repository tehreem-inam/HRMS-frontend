import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyService from "../../services/companyService";

const initialState = {
  companies: [],
  selectedCompany: null,

  isLoading: false,
  error: null,
};

// ==========================
// GET COMPANIES
// ==========================

export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  

  async (_, thunkAPI) => {
    try {
      return await companyService.getCompanies();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch companies"
      );
    }
  }
);
export const createCompany = createAsyncThunk(
  "company/createCompany",

  async (companyData, thunkAPI) => {
    try {
      return await companyService.createCompany(
        companyData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create company"
      );
    }
  }
);
export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ id, data }, thunkAPI) => {
    try {
      return await companyService.updateCompany(
        id,
        data
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update company"
      );
    }
  }
);
export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (companyId, thunkAPI) => {
    try {
      return await companyService.deleteCompany(
        companyId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete company"
      );
    }
  }
);
export const changeCompanyStatus = createAsyncThunk(
  "company/changeCompanyStatus",

  async ({ companyId, isActive }, thunkAPI) => {
    try {
      return await companyService.changeCompanyStatus(
        companyId,
        isActive
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to change company status"
      );
    }
  }
);
export const getCompanyById = createAsyncThunk(
  "company/getCompanyById",

  async (companyId, thunkAPI) => {
    try {
      return await companyService.getCompanyById(
        companyId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Failed to fetch company"
      );
    }
  }
);
export const createOwner = createAsyncThunk(
  "company/createCompanyOwner",

  async (
    { companyId, ownerData },
    thunkAPI
  ) => {
    try {
      return await companyService.createCompanyOwner(
        companyId,
        ownerData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create company owner"
      );
    }
  }
);
const companySlice = createSlice({
  name: "company",

  initialState,

  reducers: {
    clearCompanyError(state) {
      state.error = null;
    },

    clearSelectedCompany(state) {
      state.selectedCompany = null;
    },
  },

extraReducers: (builder) => {
  builder

    // GET
    .addCase(getCompanies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase(getCompanies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.companies = action.payload;
    })

    .addCase(getCompanies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // CREATE
    .addCase(createCompany.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase(createCompany.fulfilled, (state, action) => {
      state.isLoading = false;

      state.companies.unshift(action.payload);
    })

    .addCase(createCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // UPDATE
    .addCase(updateCompany.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

.addCase(updateCompany.fulfilled, (state, action) => {
  state.isLoading = false;

  const index = state.companies.findIndex(
    (company) => company.id === action.payload.id
  );

  if (index !== -1) {
    state.companies[index] = {
      ...state.companies[index],
      ...action.payload,
    };
  }

  state.selectedCompany = action.payload;
})

    .addCase(updateCompany.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // DELETE

.addCase(deleteCompany.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(deleteCompany.fulfilled, (state, action) => {
  state.isLoading = false;

  state.companies = state.companies.filter(
    (company) => company.id !== action.payload
  );
})

.addCase(deleteCompany.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
// CHANGE STATUS
   .addCase(changeCompanyStatus.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(changeCompanyStatus.fulfilled, (state, action) => {
  state.isLoading = false;

  const index = state.companies.findIndex(
    (company) => company.id === action.payload.id
  );

  if (index !== -1) {
    state.companies[index] = action.payload;
  }
})

.addCase(changeCompanyStatus.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
}) 
// ==========================
// GET COMPANY DETAILS
// ==========================

.addCase(getCompanyById.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(getCompanyById.fulfilled, (state, action) => {
  state.isLoading = false;

  state.selectedCompany = action.payload;
})

.addCase(getCompanyById.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
//create company owner
.addCase(createOwner.pending, (state) => {
  state.isLoading = true;
  state.error = null;
})

.addCase(createOwner.fulfilled, (state) => {
  state.isLoading = false;
})

.addCase(createOwner.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
}

});



export const {
  clearCompanyError,
  clearSelectedCompany,
} = companySlice.actions;

export default companySlice.reducer;
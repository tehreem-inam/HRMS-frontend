import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import employeeReducer from "./slices/employeeSlice";
import companyReducer from "./slices/companySlice";
import hrManagerReducer from "./slices/hrManagerSlice";
import departmentReducer from "./slices/departmentSlice";
import designationReducer from "./slices/designationSlice";
// import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    company: companyReducer,
    hrManager: hrManagerReducer,
    department: departmentReducer,
    designation: designationReducer,

    // ui: uiReducer,
  },

  devTools: import.meta.env.DEV,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
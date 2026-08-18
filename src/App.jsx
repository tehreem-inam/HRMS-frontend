import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Companies from "./pages/companies/Companies";
import CompanyDetails from "./pages/companies/CompanyDetails";
import HRManagers from "./pages/hrManagers/HRManagers";
import HRManagerDetails from "./pages/hrManagers/HRManagerDetails";
import Departments from "./pages/department/Departments";
import DepartmentDetails from "./pages/department/DepartmentDetails";
import Designations from "./pages/designations/Designations";
import DesignationDetails from "./pages/designations/DesignationDetails";
import Employees from "./pages/employees/Employees";
import EmployeeDetails from "./pages/employees/EmployeeDetails";
import MyProfile from "./pages/employees/MyProfile";


import Loader from "./components/common/Loader";

import { initializeAuth } from "./store/slices/authSlice";
import { ROLES } from "./utils/roles";

export default function App() {
  const dispatch = useDispatch();

  const { isInitialized , isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }


  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={<Login />}
            />
          </Route>
        </Route>

        {/* ================= PROTECTED ================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/companies"
              element={
                <RoleProtectedRoute
                  allowedRoles={[
                    ROLES.SUPER_ADMIN,
                  ]}
                >
                  <Companies />
                </RoleProtectedRoute>
              }
            />
            <Route
  path="/companies/:companyId"
  element={
    <RoleProtectedRoute
      allowedRoles={[ROLES.SUPER_ADMIN]}
    >
      <CompanyDetails />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/hr-managers"
  element={
    <RoleProtectedRoute
      allowedRoles={[ROLES.COMPANY_OWNER]}
    >
      <HRManagers />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/hr-managers/:employeeId"
  element={<HRManagerDetails />}
/>
<Route
  path="/departments"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        ROLES.COMPANY_OWNER,
        ROLES.HR,
      ]}
    >
      <Departments />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/departments/:departmentId"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        ROLES.COMPANY_OWNER,
        ROLES.HR,
      ]}
    >
      <DepartmentDetails />
    
    </RoleProtectedRoute>
  }
/>
<Route
  path="/designations"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        ROLES.COMPANY_OWNER,
        ROLES.HR,
      ]}
    >
      <Designations />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/designations/:designationId"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        ROLES.COMPANY_OWNER,
        ROLES.HR,
      ]}
    >
      <DesignationDetails />
    
    </RoleProtectedRoute>
  }
/>
<Route
  path="/employees"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        ROLES.COMPANY_OWNER,
        ROLES.HR,
      ]}
    >
      <Employees />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/employees/:employeeId"
  element={
    <RoleProtectedRoute
      allowedRoles={[
        ROLES.COMPANY_OWNER,
        ROLES.HR,
      ]}
    >
      <EmployeeDetails />
    
    </RoleProtectedRoute>
  }
/>
<Route
  path="/employees/me/profile"
  element={<MyProfile />}
/>
          </Route>
        </Route>

        {/* ================= REDIRECT ================= */}


<Route
  path="/"
  element={
    <Navigate
      to={isAuthenticated ? "/dashboard" : "/login"}
      replace
    />
  }
/>

<Route
  path="*"
  element={
    <Navigate
      to={isAuthenticated ? "/dashboard" : "/login"}
      replace
    />
  }
/>

      </Routes>
    </BrowserRouter>
  );
}
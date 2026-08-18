import axiosInstance from "./axios";

const getEmployees = async () => {
  const { data } = await axiosInstance.get(
    "/companies/employees"
  );

  return data;
};

const getEmployeeById = async (employeeId) => {
  const { data } = await axiosInstance.get(
    `/companies/employees/${employeeId}`
  );

  return data;
};

const createEmployee = async (employeeData) => {
  const { data } = await axiosInstance.post(
    "/companies/employees",
    employeeData
  );

  return data;
};

const updateEmployeeProfile = async (
  employeeId,
  profileData
) => {
  const { data } = await axiosInstance.patch(
    `/companies/employees/${employeeId}/profile`,
    profileData
  );

  return data;
};
const getMyProfile = async () => {
  const { data } = await axiosInstance.get(
    "/companies/employees/me"
  );

  return data;
};

const updateMyProfile = async (profileData) => {
  const { data } = await axiosInstance.patch(
    "/companies/employees/me/profile",
    profileData
  );

  return data;
};
const assignDepartment = async (
  employeeId,
  departmentId
) => {
  const { data } = await axiosInstance.post(
    `/companies/employees/${employeeId}/assign-department`,
    {
      department_id: departmentId,
    }
  );

  return data;
};
const assignDesignation = async (
  employeeId,
  designationId
) => {
  const { data } = await axiosInstance.post(
    `/companies/employees/${employeeId}/assign-designation`,
    {
      designation_id: designationId,
    }
  );

  return data;
};
const assignManager = async (
  employeeId,
  managerId
) => {
  const { data } = await axiosInstance.post(
    `/companies/employees/${employeeId}/assign-manager`,
    {
      manager_id: managerId,
    }
  );

  return data;
};
const getEmployeeManager = async (
  employeeId
) => {
  const { data } = await axiosInstance.get(
    `/companies/employees/${employeeId}/manager`
  );

  return data;
};
const getEmployeeSubordinates = async (
  managerId
) => {
  const { data } = await axiosInstance.get(
    `/companies/employees/${managerId}/subordinates`
  );

  return data;
};
export default {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployeeProfile,
    getMyProfile,
    updateMyProfile,
    assignDepartment,
    assignDesignation,
    assignManager,
    getEmployeeManager,
    getEmployeeSubordinates,
};
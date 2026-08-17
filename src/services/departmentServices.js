import axiosInstance from "./axios";

const getDepartments = async () => {
  const { data } = await axiosInstance.get(
    "/companies/departments"
  );

  return data;
};
const createDepartment = async (departmentData) => {
  const { data } = await axiosInstance.post(
    "/companies/departments",
    departmentData
  );

  return data;
};
const updateDepartment = async (
  departmentId,
  departmentData
) => {
  const { data } = await axiosInstance.patch(
    `/companies/departments/${departmentId}`,
    departmentData
  );

  return data;
};
const getDepartmentById = async (departmentId) => {
  const { data } = await axiosInstance.get(
    `/companies/departments/${departmentId}`
  );

  return data;
};
const changeDepartmentStatus = async (
  departmentId,
  isActive
) => {
  const { data } = await axiosInstance.patch(
    `/companies/departments/${departmentId}/status`,
    {
      is_active: isActive,
    }
  );

  return data;
};
export default {
  getDepartments,
  createDepartment,
  updateDepartment,
  getDepartmentById,
  changeDepartmentStatus,
};
import axiosInstance from "./axios";

const getHRManagers = async () => {
  const { data } = await axiosInstance.get(
    "/companies/hr-managers/"
  );

  return data;
};

const createHRManager = async (hrManagerData) => {
  const { data } = await axiosInstance.post(
    "/companies/hr-managers/",
    hrManagerData
  );

  return data;
};
const changeHRManagerStatus = async (
  employeeId,
  status
) => {
  const { data } = await axiosInstance.patch(
    `/companies/hr-managers/${employeeId}/status`,
    {
      status,
    }
  );

  return data;
};
const getHRManagerById = async (employeeId) => {
  const { data } = await axiosInstance.get(
    `/companies/hr-managers/${employeeId}`
  );

  return data;
};
export default {
  getHRManagers,
  createHRManager,
  changeHRManagerStatus,
  getHRManagerById,
};

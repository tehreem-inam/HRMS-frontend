import axiosInstance from "./axios";

const getDesignations = async () => {
  const { data } = await axiosInstance.get(
    "/companies/designations"
  );

  return data;
};

const createDesignation = async (
  designationData
) => {
  const { data } = await axiosInstance.post(
    "/companies/designations",
    designationData
  );

  return data;
};

const updateDesignation = async (
  designationId,
  designationData
) => {
  const { data } = await axiosInstance.patch(
    `/companies/designations/${designationId}`,
    designationData
  );

  return data;
};
const getDesignationById = async (designationId) => {
  const { data } = await axiosInstance.get(
    `/companies/designations/${designationId}`
  );

  return data;
};
export default {
  getDesignations,
  createDesignation,
  updateDesignation,
    getDesignationById,
};
import axiosInstance from "./axios";

const getCompanies = async () => {
  const { data } = await axiosInstance.get("/system/companies");
  return data;
};

const createCompany = async (companyData) => {
  const { data } = await axiosInstance.post(
    "/system/companies",
    companyData
  );

  return data;
};

const updateCompany = async (
  companyId,
  companyData
) => {
  const { data } = await axiosInstance.patch(
    `/system/companies/${companyId}`,
    companyData
  );

  return data;
};
const deleteCompany = async (companyId) => {
  await axiosInstance.delete(
    `/system/companies/${companyId}`
  );

  return companyId;
};
const changeCompanyStatus = async (
  companyId,
  isActive
) => {
  const { data } = await axiosInstance.patch(
    `/system/companies/${companyId}/status`,
    {
      is_active: isActive,
    }
  );

  return data;
};
const getCompanyById = async (companyId) => {
  const { data } = await axiosInstance.get(
    `/system/companies/${companyId}`
  );

  return data;
};
const createCompanyOwner = async (
  companyId,
  ownerData
) => {
  const { data } = await axiosInstance.post(
    `/system/companies/${companyId}/owners`,
    ownerData
  );

  return data;
};
const companyService = {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  changeCompanyStatus,
  getCompanyById,
  createCompanyOwner,
};

export default companyService;
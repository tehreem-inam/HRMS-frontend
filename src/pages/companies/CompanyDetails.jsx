import { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiBuildingOffice2,
  HiEnvelope,
  HiCheckCircle,
  HiXCircle,
  HiUserPlus,
  HiPencilSquare,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import CompanyOwner from "./CompanyOwner";


import {
  getCompanyById, createOwner
} from "../../store/slices/companySlice";

const CompanyDetails = () => {
  const { companyId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isOwnerModalOpen, setIsOwnerModalOpen] =
  useState(false);

const handleCreateOwner = async (data) => {
  try {
    await dispatch(
      createOwner({
        companyId,
        ownerData: data,
      })
    ).unwrap();

    setIsOwnerModalOpen(false);

    dispatch(getCompanyById(companyId));
  } catch (error) {
    console.error(error);
  }
};
  const {
    selectedCompany,
    isLoading,
    error,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompanyById(companyId));
  }, [dispatch, companyId]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!selectedCompany) {
    return null;
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            to="/companies"
            className="mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <HiArrowLeft />

            Back to Companies
          </Link>

          <h1 className="text-4xl font-bold">
            Company Details
          </h1>

          <p className="mt-2 text-gray-500">
            View company information
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() =>
              navigate("/companies")
            }
            className="
              rounded-xl
              border
              px-5
              py-3
              font-semibold
              hover:bg-gray-100
            "
          >
            Close
          </button>

        </div>

      </div>

      {/* Company Information */}

      <div className="rounded-2xl border bg-white p-8">

        <div className="mb-8 flex items-center gap-5">

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-2xl
              bg-blue-100
              text-blue-600
            "
          >
            <HiBuildingOffice2 size={42} />
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {selectedCompany.name}
            </h2>

            <p className="text-gray-500">
              Company Profile
            </p>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Name */}

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <HiBuildingOffice2 />
              Company Name
            </div>

            <p className="text-lg font-semibold">
              {selectedCompany.name}
            </p>

          </div>

          {/* Email */}

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <HiEnvelope />
              Email Address
            </div>

            <p className="text-lg font-semibold">
              {selectedCompany.email}
            </p>

          </div>

          {/* Status */}

          <div className="rounded-xl border p-5">

            <div className="mb-2 flex items-center gap-2 text-gray-500">
              {selectedCompany.is_active ? (
                <HiCheckCircle />
              ) : (
                <HiXCircle />
              )}

              Status
            </div>

            <Badge
              variant={
                selectedCompany.is_active
                  ? "success"
                  : "danger"
              }
            >
              {selectedCompany.is_active
                ? "Active"
                : "Inactive"}
            </Badge>

          </div>

          {/* ID */}

          <div className="rounded-xl border p-5">

            <div className="mb-2 text-gray-500">
              Company ID
            </div>

            <p className="text-lg font-semibold">
              #{selectedCompany.id}
            </p>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="rounded-2xl border bg-white p-8">

        <h3 className="mb-6 text-2xl font-semibold">
          Quick Actions
        </h3>

        <div className="grid gap-4 md:grid-cols-3">

          <button
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              border
              p-5
              hover:bg-gray-50
            "
          >
            <HiPencilSquare size={22} />

            Edit Company
          </button>

{!selectedCompany.has_owner ? (
  <button
    onClick={() => setIsOwnerModalOpen(true)}
    className="
      flex
      items-center
      justify-center
      gap-3
      rounded-xl
      border
      border-blue-200
      bg-blue-50
      p-5
      text-blue-700
      hover:bg-blue-100
    "
  >
    <HiUserPlus size={22} />
    Create Owner
  </button>
) : (
  <div
    className="
      flex
      items-center
      justify-center
      gap-3
      rounded-xl
      border
      border-green-200
      bg-green-50
      p-5
      text-green-700
      font-semibold
    "
  >
    <HiCheckCircle size={22} />
    Owner Created
  </div>
)}
          <button
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-5
              text-red-600
              hover:bg-red-100
            "
          >
            {selectedCompany.is_active
              ? "Deactivate Company"
              : "Activate Company"}
          </button>

        </div>

      </div>

      {/* Future Statistics */}

      <div className="rounded-2xl border bg-white p-8">

        <h3 className="mb-6 text-2xl font-semibold">
          Company Statistics
        </h3>

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">

          {[
            "Employees",
            "Departments",
            "HR Managers",
            "Attendance",
            "Leave",
            "Payroll",
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border p-5 text-center"
            >
              <p className="text-3xl font-bold">
                0
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {item}
              </p>

            </div>
          ))}

        </div>

      </div>
<Modal
  open={isOwnerModalOpen}
  onClose={() =>
    setIsOwnerModalOpen(false)
  }
  title="Create Company Owner"
  size="md"
>
  <CompanyOwner
    loading={isLoading}
    onSubmit={handleCreateOwner}
  />
</Modal>

    </div>
  );
};

export default CompanyDetails;
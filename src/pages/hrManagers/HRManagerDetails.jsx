import { useEffect } from "react";
import {
  HiArrowLeft,
  HiUsers,
  HiEnvelope,
  HiIdentification,
  HiCalendarDays,
} from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/common/Loader";
import Badge from "../../components/common/Badge";

import { getHRManagerById } from "../../store/slices/hrManagerSlice";

export default function HRManagerDetails() {
  const { employeeId } = useParams();

  const dispatch = useDispatch();

  const {
    selectedHRManager,
    isLoading,
    error,
  } = useSelector((state) => state.hrManager);

  useEffect(() => {
    dispatch(getHRManagerById(employeeId));
  }, [dispatch, employeeId]);

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

  if (!selectedHRManager) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <Link
          to="/hr-managers"
          className="mb-4 inline-flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <HiArrowLeft />
          Back to HR Managers
        </Link>

        <h1 className="text-4xl font-bold">
          HR Manager Details
        </h1>

        <p className="mt-2 text-gray-500">
          View HR Manager information
        </p>
      </div>

      {/* Details Card */}

      <div className="rounded-2xl border bg-white p-8">
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <HiUsers size={42} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {selectedHRManager.first_name}
            </h2>

            <p className="text-gray-500">
              HR Manager Profile
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Name */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <HiUsers />
              Name
            </div>

            <p className="text-lg font-semibold">
              {selectedHRManager.first_name}
            </p>
          </div>

          {/* Email */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <HiEnvelope />
              Email
            </div>

            <p className="text-lg font-semibold">
              {selectedHRManager.email}
            </p>
          </div>

          {/* Employee Code */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <HiIdentification />
              Employee Code
            </div>

            <p className="text-lg font-semibold">
              {selectedHRManager.employee_code}
            </p>
          </div>

          {/* Joining Date */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 flex items-center gap-2 text-gray-500">
              <HiCalendarDays />
              Joining Date
            </div>

            <p className="text-lg font-semibold">
              {selectedHRManager.joining_date}
            </p>
          </div>

          {/* Status */}

          <div className="rounded-xl border p-5">
            <div className="mb-2 text-gray-500">
              Status
            </div>

            <Badge
              variant={
                selectedHRManager.status === "active"
                  ? "success"
                  : selectedHRManager.status === "inactive"
                  ? "secondary"
                  : selectedHRManager.status === "on_leave"
                  ? "warning"
                  : "danger"
              }
            >
              {selectedHRManager.status.replace(
                "_",
                " "
              )}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
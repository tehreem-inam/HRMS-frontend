import { useEffect } from "react";
import {
  HiArrowLeft,
  HiBriefcase,
} from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Badge from "../../components/common/Badge";
import Loader from "../../components/common/Loader";

import {
  getDesignationById,
} from "../../store/slices/designationSlice";

export default function DesignationDetails() {
  const { designationId } = useParams();

  const dispatch = useDispatch();

  const {
    selectedDesignation,
    isLoading,
    error,
  } = useSelector(
    (state) => state.designation
  );

  const { departments } = useSelector(
    (state) => state.department
  );

  useEffect(() => {
    dispatch(
      getDesignationById(designationId)
    );
  }, [dispatch, designationId]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <p className="text-red-500">
        {error}
      </p>
    );
  }

  if (!selectedDesignation) return null;

  const department =
    departments.find(
      (department) =>
        department.id ===
        selectedDesignation.department_id
    );

  return (
    <div className="space-y-8">
      <div>
        <Link
          to="/designations"
          className="mb-4 inline-flex items-center gap-2 text-gray-600"
        >
          <HiArrowLeft />
          Back
        </Link>

        <h1 className="text-4xl font-bold">
          Designation Details
        </h1>
      </div>

      <div className="rounded-2xl border bg-white p-8">
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <HiBriefcase size={42} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {selectedDesignation.title}
            </h2>

            <p className="text-gray-500">
              Designation Information
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <p className="text-gray-500">
              Designation
            </p>

            <p className="text-lg font-semibold">
              {selectedDesignation.title}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-gray-500">
              Department
            </p>

            <p className="text-lg font-semibold">
              {department?.name ?? "-"}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="mb-3 text-gray-500">
              Status
            </p>

            <Badge
              variant={
                selectedDesignation.is_active
                  ? "success"
                  : "danger"
              }
            >
              {selectedDesignation.is_active
                ? "Active"
                : "Inactive"}
            </Badge>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-gray-500">
              Created At
            </p>

            <p className="text-lg font-semibold">
              {new Date(
                selectedDesignation.created_at
              ).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <div className="rounded-xl border p-5 md:col-span-2">
            <p className="text-gray-500">
              Description
            </p>

            <p className="mt-2">
              {selectedDesignation.description ||
                "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

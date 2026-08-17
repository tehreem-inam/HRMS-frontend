import { useEffect } from "react";
import {
  HiArrowLeft,
  HiBuildingOffice2,

} from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Badge from "../../components/common/Badge";
import Loader from "../../components/common/Loader";

import { getDepartmentById , changeDepartmentStatus } from "../../store/slices/departmentSlice";

export default function DepartmentDetails() {
  const { departmentId } = useParams();

  const dispatch = useDispatch();

  const {
    selectedDepartment,
    isLoading,
    error,
  } = useSelector(
    (state) => state.department
  );

  useEffect(() => {
    dispatch(getDepartmentById(departmentId));
  }, [dispatch, departmentId]);

  if (isLoading) return <Loader />;

  if (error) return <p>{error}</p>;

  if (!selectedDepartment) return null;
const handleStatusChange = async () => {
  try {
    await dispatch(
      changeDepartmentStatus({
        departmentId:
          selectedDepartment.id,
        isActive:
          !selectedDepartment.is_active,
      })
    ).unwrap();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="space-y-8">

      <div>
        <Link
          to="/departments"
          className="mb-4 inline-flex items-center gap-2 text-gray-600"
        >
          <HiArrowLeft />
          Back
        </Link>

        <h1 className="text-4xl font-bold">
          Department Details
        </h1>
      </div>

      <div className="rounded-2xl border bg-white p-8">

        <div className="mb-8 flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <HiBuildingOffice2 size={42} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {selectedDepartment.name}
            </h2>

            <p className="text-gray-500">
              Department Information
            </p>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="rounded-xl border p-5">
            <p className="text-gray-500">
              Department Name
            </p>

            <p className="font-semibold text-lg">
              {selectedDepartment.name}
            </p>
          </div>

<div className="rounded-xl border p-5">
  <p className="mb-3 text-gray-500">
    Status
  </p>

  <Badge
    variant={
      selectedDepartment.is_active
        ? "success"
        : "danger"
    }
  >
    {selectedDepartment.is_active
      ? "Active"
      : "Inactive"}
  </Badge>

  <button
    onClick={handleStatusChange}
    disabled={isLoading}
    className="
      mt-4
      rounded-lg
      border
      px-4
      py-2
      hover:bg-gray-100
    "
  >
    {selectedDepartment.is_active
      ? "Deactivate"
      : "Activate"}
  </button>
</div>

          <div className="rounded-xl border p-5 md:col-span-2">
            <p className="text-gray-500">
              Description
            </p>

            <p className="mt-2">
              {selectedDepartment.description}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-gray-500">
              Department Head
            </p>

            <p className="font-semibold">
              {selectedDepartment.head_employee_id
                ? `Employee #${selectedDepartment.head_employee_id}`
                : "Not Assigned"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
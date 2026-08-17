import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "../../components/common/Input";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getDepartments,
} from "../../store/slices/departmentSlice";

export default function DesignationForm({
  designation,
  loading,
  onSubmit,
}) {
  const dispatch = useDispatch();

  const { departments = [] } = useSelector(
    (state) => state.department
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      department_id: "",
      description: "",
    },
  });

  // Fetch departments
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  // Set form values
  useEffect(() => {
    if (designation) {
      reset({
        title: designation.title || "",
        department_id:
          designation.department_id || "",
        description:
          designation.description || "",
      });
    } else {
      reset({
        title: "",
        department_id: "",
        description: "",
      });
    }
  }, [designation, reset]);

  // Only active departments for CREATE
  const activeDepartments =
    departments.filter(
      (department) =>
        department.is_active
    );

  const handleFormSubmit = (data) => {
    console.log(
      "Designation Form Data:",
      data
    );

    onSubmit({
      title: data.title.trim(),
      department_id: Number(
        data.department_id
      ),
      description:
        data.description?.trim() || "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(
        handleFormSubmit
      )}
      className="space-y-5"
    >
      {/* Title */}
      <Input
        label="Designation Title"
        placeholder="Enter designation title"
        error={errors.title?.message}
        {...register("title", {
          required:
            "Designation title is required",
        })}
      />

      {/* Department */}
      {!designation && (
        <div>
          <label className="mb-2 block font-medium text-gray-700">
            Department
          </label>

          <select
            {...register("department_id", {
              required:
                "Department is required",
              validate: (value) =>
                Number(value) > 0 ||
                "Please select a department",
            })}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              outline-none
              transition
              focus:border-black
            "
          >
            <option value="">
              Select Department
            </option>

            {activeDepartments.map(
              (department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              )
            )}
          </select>

          {errors.department_id && (
            <p className="mt-1 text-sm text-red-500">
              {
                errors.department_id
                  .message
              }
            </p>
          )}
        </div>
      )}

      {/* Description */}
      <Input
        label="Description"
        placeholder="Enter description"
        error={
          errors.description?.message
        }
        {...register("description")}
      />

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="
            rounded-xl
            bg-black
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-gray-900
            disabled:opacity-50
          "
        >
          {designation
            ? "Update Designation"
            : "Create Designation"}
        </button>
      </div>
    </form>
  );
}
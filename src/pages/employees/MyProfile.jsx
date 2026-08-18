import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiUser } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Loader from "../../components/common/Loader";

import {
  getMyProfile,
  updateMyProfile,
} from "../../store/slices/employeeSlice";

const schema = z.object({
  gender: z
    .enum(["male", "female", "other"])
    .optional()
    .or(z.literal("")),

  date_of_birth: z
    .string()
    .optional(),
});

export default function MyProfile() {
  const dispatch = useDispatch();

  const {
    myProfile,
    isLoading,
    error,
  } = useSelector(
    (state) => state.employee
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      gender: "",
      date_of_birth: "",
    },
  });

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (myProfile) {
      reset({
        gender: myProfile.gender || "",
        date_of_birth:
          myProfile.date_of_birth || "",
      });
    }
  }, [myProfile, reset]);

  const handleSave = async (data) => {
    try {
      await dispatch(
        updateMyProfile({
          gender: data.gender || null,
          date_of_birth:
            data.date_of_birth || null,
        })
      ).unwrap();

      dispatch(getMyProfile());
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading && !myProfile) {
    return <Loader />;
  }

  if (error && !myProfile) {
    return (
      <p className="text-red-500">
        {error}
      </p>
    );
  }

  if (!myProfile) {
    return null;
  }

  const fullName = [
    myProfile.first_name,
    myProfile.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage your personal profile
        </p>
      </div>

      {/* Profile Header */}

      <div className="rounded-2xl border bg-white p-8">
        <div className="flex items-center gap-5">
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
            <HiUser size={40} />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {fullName || "Employee"}
            </h2>

            <p className="mt-1 text-gray-500">
              {myProfile.employee_code}
            </p>
          </div>
        </div>
      </div>

      {/* Employee Information */}

      <div className="rounded-2xl border bg-white p-8">
        <h2 className="mb-6 text-xl font-semibold">
          Employment Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Employee Code
            </p>

            <p className="mt-1 font-semibold">
              {myProfile.employee_code}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="mt-1 font-semibold capitalize">
              {myProfile.status}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Joining Date
            </p>

            <p className="mt-1 font-semibold">
              {myProfile.joining_date || "Not Available"}
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500">
              Employment Type
            </p>

            <p className="mt-1 font-semibold capitalize">
              {myProfile.employment_type
                ? myProfile.employment_type.replace(
                    "_",
                    " "
                  )
                : "Not Assigned"}
            </p>
          </div>
        </div>
      </div>

      {/* Editable Profile */}

      <div className="rounded-2xl border bg-white p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your personal information
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Input
              label="First Name"
              value={
                myProfile.first_name || ""
              }
              disabled
            />

            <Input
              label="Last Name"
              value={
                myProfile.last_name || ""
              }
              disabled
            />

            <Select
              label="Gender"
              error={errors.gender?.message}
              {...register("gender")}
            >
              <option value="">
                Select Gender
              </option>

              <option value="male">
                Male
              </option>

              <option value="female">
                Female
              </option>

              <option value="other">
                Other
              </option>
            </Select>

            <Input
              label="Date of Birth"
              type="date"
              error={
                errors.date_of_birth?.message
              }
              {...register("date_of_birth")}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="
                rounded-lg
                bg-black
                px-6
                py-2.5
                font-semibold
                text-white
                hover:bg-gray-900
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isLoading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
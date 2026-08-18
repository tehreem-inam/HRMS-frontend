import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

const createSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    ),

  first_name: z
    .string()
    .min(2, "First name is required"),

  last_name: z.string().optional(),
});

const updateSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name is required"),

  last_name: z.string().optional(),

  gender: z
    .enum(["male", "female", "other"])
    .optional()
    .or(z.literal("")),

  date_of_birth: z.string().optional(),

  employment_type: z
    .enum([
      "full_time",
      "part_time",
      "contract",
      "internship",
    ])
    .optional()
    .or(z.literal("")),
});

export default function EmployeeForm({
  employee,
  loading,
  onSubmit,
}) {
  const isEditMode = Boolean(employee);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      isEditMode
        ? updateSchema
        : createSchema
    ),

    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      gender: "",
      date_of_birth: "",
      employment_type: "",
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        email: "",
        password: "",

        first_name:
          employee.first_name || "",

        last_name:
          employee.last_name || "",

        gender:
          employee.gender || "",

        date_of_birth:
          employee.date_of_birth || "",

        employment_type:
          employee.employment_type || "",
      });
    } else {
      reset({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        employment_type: "",
      });
    }
  }, [employee, reset]);

  const submit = (data) => {
    if (isEditMode) {
      onSubmit({
        first_name: data.first_name,
        last_name: data.last_name,
        gender: data.gender || null,
        date_of_birth:
          data.date_of_birth || null,
        employment_type:
          data.employment_type || null,
      });

      return;
    }

    onSubmit({
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      {!isEditMode && (
        <>
          <Input
            label="Email"
            type="email"
            required
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            required
            error={errors.password?.message}
            {...register("password")}
          />
        </>
      )}

      <Input
        label="First Name"
        required
        error={errors.first_name?.message}
        {...register("first_name")}
      />

      <Input
        label="Last Name"
        error={errors.last_name?.message}
        {...register("last_name")}
      />

      {isEditMode && (
        <>
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

          <Select
            label="Employment Type"
            error={
              errors.employment_type?.message
            }
            {...register("employment_type")}
          >
            <option value="">
              Select Employment Type
            </option>

            <option value="full_time">
              Full Time
            </option>

            <option value="part_time">
              Part Time
            </option>

            <option value="contract">
              Contract
            </option>

            <option value="internship">
              Internship
            </option>
          </Select>
        </>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="
            rounded-lg
            bg-black
            px-5
            py-2
            text-white
            hover:bg-gray-900
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Saving..."
            : isEditMode
            ? "Update Employee"
            : "Create Employee"}
        </button>
      </div>
    </form>
  );
}
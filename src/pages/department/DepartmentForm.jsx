import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/common/Input";

const schema = z.object({
  name: z
    .string()
    .min(2, "Department name is required"),

  description: z
    .string()
    .min(5, "Description is required"),
});

export default function DepartmentForm({
  loading,
  onSubmit,
  department,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
        description: department.description,
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [department, reset]);

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      <Input
        label="Department Name"
        required
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Description"
        required
        error={errors.description?.message}
        {...register("description")}
      />

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
          "
        >
          {loading
            ? "Saving..."
            : department
            ? "Update Department"
            : "Create Department"}
        </button>
      </div>
    </form>
  );
}
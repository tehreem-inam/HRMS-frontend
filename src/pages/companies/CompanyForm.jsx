import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/common/Input";

const schema = z.object({
  name: z
    .string()
    .min(2, "Company name is required"),

  email: z.email("Enter a valid email"),

});

const CompanyForm = ({
  company,
  onSubmit,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      name: "",

      email: "",

    },
  });

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,

        email: company.email,

        is_active: company.is_active,
      });
    } else {
      reset({
        name: "",

        email: "",

        is_active: true,
      });
    }
  }, [company, reset]);

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      <Input
        label="Company Name"
        required
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email"
        required
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

{/* {company && (
  <label className="flex items-center gap-3">
    <input
      type="checkbox"
      {...register("is_active")}
    />

    Active Company
  </label>
)} */}



      <div className="flex justify-end gap-3">
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
            : company
            ? "Update Company"
            : "Create Company"}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/common/Input";

const schema = z.object({
  email: z.string().email("Enter a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

const CompanyOwnerForm = ({
  loading,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
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
            ? "Creating..."
            : "Create Owner"}
        </button>
      </div>
    </form>
  );
};

export default CompanyOwnerForm;
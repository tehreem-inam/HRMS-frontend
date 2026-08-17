import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const schema = z.object({
  email: z
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),

  rememberMe: z.boolean(),
});

export default function Login() {
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),

    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to continue
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type={
              showPassword ? "text" : "password"
            }
            autoComplete="current-password"
            required
            placeholder="Enter password"
            error={errors.password?.message}
            rightIcon={
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>
            }
            {...register("password")}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              {...register("rememberMe")}
            />

            Remember Me
          </label>

          <Button
            type="submit" 
            loading={isLoading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
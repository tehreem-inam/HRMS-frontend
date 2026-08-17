import { forwardRef, useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      required = false,
      leftIcon,
      rightIcon,
      type = "text",
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {label}

            {required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
        )}

        <div className="relative">

          {/* Left Icon */}

          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            id={id}
            ref={ref}
            type={inputType}
            className={`
              w-full
              rounded-lg
              border
              bg-white
              px-4
              py-2.5
              text-sm
              outline-none
              transition-all
              duration-200

              ${
                leftIcon
                  ? "pl-10"
                  : ""
              }

              ${
                type === "password" || rightIcon
                  ? "pr-10"
                  : ""
              }

              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }

              disabled:bg-gray-100
              disabled:cursor-not-allowed

              ${className}
            `}
            {...props}
          />

          {/* Password Toggle */}

          {type === "password" && (
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? (
                <HiEyeSlash />
              ) : (
                <HiEye />
              )}
            </button>
          )}

          {/* Right Icon */}

          {type !== "password" &&
            rightIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {rightIcon}
              </div>
            )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
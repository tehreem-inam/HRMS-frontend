import { forwardRef } from "react";

const Select = forwardRef(
  (
    {
      label,
      required = false,
      error,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}

            {required && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>
        )}

        <select
          ref={ref}
          {...props}
          className={`
            w-full
            rounded-lg
            border
            bg-white
            px-4
            py-2.5
            text-sm
            text-gray-900
            outline-none
            transition
            focus:border-black
            focus:ring-1
            focus:ring-black
            disabled:cursor-not-allowed
            disabled:bg-gray-100
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
        >
          {children}
        </select>

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
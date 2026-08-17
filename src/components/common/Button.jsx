
const Button = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        w-full
        h-11
        rounded-lg
        font-medium
        transition-all
        duration-200
        disabled:opacity-60
        disabled:cursor-not-allowed
        flex
        items-center
        justify-center
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Signing in...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
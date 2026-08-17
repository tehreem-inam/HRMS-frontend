const variants = {
  primary:
    "bg-blue-100 text-blue-700",

  secondary:
    "bg-gray-100 text-gray-700",

  success:
    "bg-green-100 text-green-700",

  warning:
    "bg-yellow-100 text-yellow-700",

  danger:
    "bg-red-100 text-red-700",

  info:
    "bg-cyan-100 text-cyan-700",

  purple:
    "bg-purple-100 text-purple-700",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

const dotColors = {
  primary: "bg-blue-600",
  secondary: "bg-gray-600",
  success: "bg-green-600",
  warning: "bg-yellow-500",
  danger: "bg-red-600",
  info: "bg-cyan-600",
  purple: "bg-purple-600",
};

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  dot = false,
  icon,
  className = "",
}) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full
        font-medium
        whitespace-nowrap
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`
            h-2 w-2 rounded-full
            ${dotColors[variant]}
          `}
        />
      )}

      {icon && icon}

      {children}
    </span>
  );
};

export default Badge;

//usage
{/* <Badge variant="success">
    Active
</Badge>

<Badge variant="danger">
    Inactive
</Badge> */}
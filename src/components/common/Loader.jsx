const sizes = {
  xs: "h-4 w-4 border-2",
  sm: "h-6 w-6 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
  xl: "h-16 w-16 border-4",
};

const Loader = ({
  size = "md",
  fullScreen = false,
  text,
}) => {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          animate-spin
          rounded-full
          border-blue-600
          border-t-transparent
          ${sizes[size]}
        `}
      />

      {text && (
        <p className="text-sm text-gray-500">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;

// usage
// <Loader size="xs" />
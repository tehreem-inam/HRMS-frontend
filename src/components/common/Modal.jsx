import { useEffect } from "react";
import { HiXMark } from "react-icons/hi2";

const sizes = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
  full: "max-w-7xl",
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}

      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (closeOnOverlay) {
            onClose();
          }
        }}
      />

      {/* Modal */}

      <div
        className={`
          relative
          z-10
          w-full
          ${sizes[size]}
          mx-4
          rounded-xl
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <HiXMark size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="max-h-[70vh] overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}

        {footer && (
          <div className="flex justify-end gap-3 border-t px-6 py-4">
            {footer}
          </div>
        )}

      </div>

    </div>
  );
};

export default Modal;

// usage 
// simple model:
// const [open, setOpen] = useState(false);

// <>
//   <button onClick={() => setOpen(true)}>
//     Open
//   </button>

//   <Modal
//     open={open}
//     onClose={() => setOpen(false)}
//     title="Create Company"
//   >
//     Form goes here...
//   </Modal>
// </>

// modal with footer:
// <Modal
//   open={open}
//   onClose={() => setOpen(false)}
//   title="Create Employee"
//   footer={
//     <>
//       <button
//         onClick={() => setOpen(false)}
//       >
//         Cancel
//       </button>

//       <button>
//         Save
//       </button>
//     </>
//   }
// >
//   ...
// </Modal>
import Modal from "./Modal";

const ConfirmDialog = ({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "red",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const confirmButtonStyles = {
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
  };

  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onCancel}
      title={title}
      size="sm"
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-600 leading-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-lg
              border
              border-gray-300
              px-4
              py-2
              font-medium
              text-gray-700
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`
              rounded-lg
              px-4
              py-2
              font-medium
              text-white
              disabled:opacity-50
              disabled:cursor-not-allowed
              ${
                confirmButtonStyles[confirmColor] ||
                confirmButtonStyles.red
              }
            `}
          >
            {loading ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
import { dialog } from "../utils/handleDialog";

const Dialog = ({ formik, children, operation, isPending }) => {
  return (
    <dialog id={`Modal_${operation}`} className="modal">
      <form onSubmit={formik.handleSubmit} className="modal-box">
        <button
          type="button"
          className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          onClick={dialog(`Modal_${operation}`).close}
        >
          ✕
        </button>
        <h3 className="mb-4 text-lg font-bold capitalize">
          {operation} your task
        </h3>
        {children}
        <button
          type="submit"
          disabled={isPending || !formik.isValid}
          className={"mt-2 btn w-full"}
        >
          {isPending ? (
            <span className="loading loading-spinner loading-md" />
          ) : (
            "Save"
          )}
        </button>
      </form>
    </dialog>
  );
};

export default Dialog;

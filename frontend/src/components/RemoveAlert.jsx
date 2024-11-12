import { dialog } from "../utils/handleDialog";

const RemoveAlert = ({ idTask, onRemove }) => {
  const { request, isPending } = onRemove();

  const handleRemove = (event) => {
    event.preventDefault();
    request(idTask);
  };

  return (
    <dialog id={`Modal_Remove`} className="modal">
      <form className="modal-box" onSubmit={handleRemove}>
        <p className="py-4">Are you sure you want to delete this task?</p>
        <div className="flex items-end modal-action">
          <button
            type="button"
            className="btn"
            onClick={() => dialog(`Modal_Remove`).close()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`w-max mt-2 btn`}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default RemoveAlert;

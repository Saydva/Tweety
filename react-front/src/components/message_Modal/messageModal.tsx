import { useMessageModalStore } from "./messageModal.store";

const MessageModal = () => {
  const { setIsOpen, isOpen } = useMessageModalStore((state) => state);
  const { clearError, clearMessage, error, message } =
    useMessageModalStore.getState();

  // This function toggles the modal open state and clears the error and message
  function messageModalHandler() {
    setIsOpen(!isOpen);
    clearError();
    clearMessage();
  }
  return (
    <div>
      <dialog
        id="my_modal_5"
        className={`modal modal-bottom sm:modal-middle
           ${isOpen ? "modal-open" : ""}
        `}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{message}</h3>
          <p className="py-4 ">
            {error?.map((error, index) => {
              return (
                <li
                  key={index}
                  className={`${
                    message == "Sign up successful"
                      ? "text-green-600"
                      : "text-red-500"
                  } mb-3`}
                >
                  {error}
                  {index < (error?.length ?? 0) - 1 ? ", " : ""}
                </li>
              );
            })}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={() => messageModalHandler()} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MessageModal;

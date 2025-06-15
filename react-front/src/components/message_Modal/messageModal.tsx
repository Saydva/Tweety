import { useMessageModalStore } from "./messageModal.store";

const MessageModal = () => {
  const openModal = useMessageModalStore((state) => state.setIsOpen);
  const isOpen = useMessageModalStore((state) => state.isOpen);
  return (
    <div>
      <dialog
        id="my_modal_5"
        className={`modal modal-bottom sm:modal-middle ${
          isOpen ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {useMessageModalStore.getState().message}
          </h3>
          <p className="py-4 ">
            {useMessageModalStore.getState().error?.map((error, index) => {
              return (
                <li key={index} className="text-red-500 mb-3">
                  {error}
                  {index <
                  (useMessageModalStore.getState().error?.length ?? 0) - 1
                    ? ", "
                    : ""}
                </li>
              );
            })}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => {
                  openModal(!isOpen);
                  useMessageModalStore.getState().clearError;
                  useMessageModalStore.getState().clearMessage;
                }}
                className="btn"
              >
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

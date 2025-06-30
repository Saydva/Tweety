import { useModalOpenStore } from "./modalOpen.store";

const LogoutModal = () => {
  const openLogoutModal = useModalOpenStore((state) => state);
  return (
    <div>
      <dialog
        className={`modal ${openLogoutModal.logoutOpen ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <p>Your logged out</p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={() => {
                  openLogoutModal.setLogoutOpen(false);
                }}
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

export default LogoutModal;

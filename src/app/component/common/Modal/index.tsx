import React, { ReactNode } from "react";

interface ModalProps {
  showModal: boolean;
  toggleModal: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, toggleModal, children }) => {
  return (
    <>
      {showModal && (
        <div
          className={`fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-50`}
          style={{
            transition: "all 0.5s cubic-bezier(.68,-0.55,.27,1.55)",
            transform: `${showModal ? "translateX(0%)" : "translateX(-100%)"}`,
          }}
        >
          <div className="fixed top-0 right-0 bottom-0 bg-white z-50 shadow-md">
            <span
              className="absolute top-0 right-5 text-appColor1 cursor-pointer text-4xl "
              onClick={toggleModal}
            >
              &times;
            </span>
            <div className="flex h-full pt-5 ">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

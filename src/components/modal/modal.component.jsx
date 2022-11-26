import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalComponent = ({ children, isOpen }) => {
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      {children}
    </Modal>
  );
};

export default ModalComponent;

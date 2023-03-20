import React, { ReactNode } from "react";
import { Modal } from "antd";

type FormModalProps = {
  isModalOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
};

export const FormModal: React.FC<FormModalProps> = ({
  isModalOpen,
  handleClose,
  children,
}) => {
  return (
    <Modal
      title="Basic Modal"
      closable
      open={isModalOpen}
      destroyOnClose={true}
      onCancel={handleClose}
    >
      {children}
    </Modal>
  );
};

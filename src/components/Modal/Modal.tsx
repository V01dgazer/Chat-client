import * as React from "react";
import {
  Modal as SemModal,
  ModalContent,
  Icon,
  SemanticICONS
} from "semantic-ui-react";

import { ModalHeader } from "./styles";

interface IProps {
  open: boolean;
  children: React.ReactNode;
  headerTitle?: string;
  headerIcon?: SemanticICONS;
  size?: "mini" | "tiny" | "small" | "large" | "fullscreen";
  closeModal: () => void;
  onIconClick?: () => any;
}

const Modal = (props: IProps) => {
  const {
    open,
    closeModal,
    onIconClick = null,
    headerTitle,
    headerIcon,
    size,
    children
  } = props;

  return (
    <SemModal
      dimmer="blurring"
      size={size || "tiny"}
      open={open}
      onClose={closeModal}
    >
      <ModalHeader>
        {headerTitle}
        {headerIcon && (
          <Icon
            name={headerIcon}
            onClick={onIconClick}
            size="large"
            style={{ cursor: onIconClick ? "pointer" : "default" }}
          />
        )}
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </SemModal>
  );
};

export default Modal;

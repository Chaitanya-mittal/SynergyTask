import {
  cloneElement,
  createContext,
  ReactNode,
  useContext,
  useState,
  FC,
  ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

// Styled Components
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem 3rem;

  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: white/90;
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 10px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: lightgray;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: gray;
  }
`;

// Modal Context
interface ModalContextProps {
  openModal: string;
  open: (name: string) => void;
  close: () => void;
}

interface ModalComponent extends FC<ModalProps> {
  Open: FC<OpenProps>;
  Window: FC<WindowProps>;
}

const Modal: ModalComponent = ({ children }) => {
  const [openModal, setOpenWindow] = useState<string>("");

  const open = (name: string) => setOpenWindow(name);
  const close = () => setOpenWindow("");

  return (
    <modalContext.Provider value={{ openModal, open, close }}>
      {children}
    </modalContext.Provider>
  );
};

// Assigning the components to Modal

const modalContext = createContext<ModalContextProps | undefined>(undefined);

// Modal Component
interface ModalProps {
  children: ReactNode;
}

// Open Component
interface OpenProps {
  children: ReactElement;
  opens: string;
}

const Open: FC<OpenProps> = ({ children, opens }) => {
  const context = useContext(modalContext);

  if (!context) {
    throw new Error("Open must be used within a Modal provider");
  }

  const { open } = context;
  return cloneElement(children, { onClick: () => open(opens) });
};

// Window Component
interface WindowProps {
  children: ReactElement;
  name: string;
}

const Window: FC<WindowProps> = ({ children, name }) => {
  const context = useContext(modalContext);

  if (!context) {
    throw new Error("Window must be used within a Modal provider");
  }

  const { openModal, close } = context;
  const { myRef } = useOutsideClick(close);

  if (name !== openModal) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={myRef}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { handleForm: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
};

// Assigning the components to Modal
Modal.Open = Open;
Modal.Window = Window;

export default Modal;

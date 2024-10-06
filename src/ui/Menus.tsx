import styled from "styled-components";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  MouseEvent,
  RefObject,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideClick from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

// Styled components
const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 4px;
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: white/90;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: black/50;
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
  position: fixed;
  background-color: #fff2f2;
  box-shadow: black/10;
  border-radius: 5px;
  padding: 5px;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: white/90;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: black/30;
    transition: all 0.3s;
  }
`;

// Context and types
interface MenuContextProps {
  openMenu: string;
  open: (menu: string) => void;
  close: () => void;
  position: { x: number; y: number } | null;
  setPosition: (position: { x: number; y: number }) => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

interface MenusProps {
  children: ReactNode;
}

function Menus({ children }: MenusProps) {
  const [openMenu, setOpenMenu] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const open = (menu: string) => setOpenMenu(menu);
  const close = () => setOpenMenu("");

  return (
    <MenuContext.Provider
      value={{ openMenu, open, close, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

interface ToggleProps {
  opens: string;
}

function Toggle({ opens }: ToggleProps) {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("Toggle must be used within Menus");
  }

  const { open, openMenu, close, setPosition } = context;

  function handleClick(e: MouseEvent<HTMLButtonElement | null>) {
    e.stopPropagation();
    if (opens === "" || opens !== openMenu) {
      open(opens);
    } else {
      close();
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

interface ListProps {
  children: ReactNode;
  name: string;
}

function List({ children, name }: ListProps) {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("List must be used within Menus");
  }

  const { openMenu, close, position } = context;
  const { myRef } = useOutsideClick(close, false);

  if (name !== openMenu || !position) return null;

  return createPortal(
    <StyledList ref={myRef as RefObject<HTMLUListElement>} position={position}>
      {children}
    </StyledList>,
    document.body,
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ children, onClick, disabled }: ButtonProps) {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("Button must be used within Menus");
  }

  const { close } = context;

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {children}
      </StyledButton>
    </li>
  );
}

// Exporting Menus with sub-components
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

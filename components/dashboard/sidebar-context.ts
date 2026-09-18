import { useState, createContext } from 'react';

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

export const useSidebarToggle = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return [isOpen, toggleSidebar];
};

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Pencil } from "lucide-react";

interface EditModeContextType {
  isEditMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  toggle: () => {},
  enable: () => {},
  disable: () => {},
});

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggle = () => setIsEditMode((prev) => !prev);
  const enable = () => setIsEditMode(true);
  const disable = () => setIsEditMode(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, toggle, enable, disable }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function EditModeToggle() {
  const { isEditMode, toggle } = useEditMode();

  return (
    <button
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium shadow-lg transition-all ${
        isEditMode
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
      }`}
    >
      <Pencil className={`h-4 w-4 ${isEditMode ? "animate-pulse" : ""}`} />
      {isEditMode ? "Режим редактирования" : "Редактировать"}
    </button>
  );
}

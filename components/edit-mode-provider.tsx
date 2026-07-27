"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Pencil, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ADMIN_PASSWORD = "admin123";

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
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleToggle = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setShowPasswordDialog(true);
      setPassword("");
      setError("");
    }
  };

  const handleSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setIsEditMode(true);
      setShowPasswordDialog(false);
      setPassword("");
      setError("");
    } else {
      setError("Неверный пароль");
    }
  };

  const enable = () => setIsEditMode(true);
  const disable = () => setIsEditMode(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, toggle: handleToggle, enable, disable }}>
      {children}

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogHeader>
          <DialogTitle>Вход для администратора</DialogTitle>
          <DialogDescription>
            Введите пароль для доступа к редактированию
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Пароль</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="Введите пароль"
              autoFocus
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>
              <Unlock className="h-4 w-4" />
              Войти
            </Button>
          </div>
        </div>
      </Dialog>
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
      {isEditMode ? (
        <Lock className="h-4 w-4" />
      ) : (
        <Pencil className="h-4 w-4" />
      )}
      {isEditMode ? "Режим редактирования" : "Редактировать"}
    </button>
  );
}

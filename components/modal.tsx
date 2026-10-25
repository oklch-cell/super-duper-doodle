import React from "react";

export function Modal({
  children,
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/10 items-center justify-center ${open ? "flex" : "hidden"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-10 bg-white border rounded p-5"
      >
        {children}
      </div>
    </div>
  );
}

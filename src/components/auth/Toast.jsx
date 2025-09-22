import React, { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg
      ${type === "success" ? "bg-green-700 text-white" : "bg-red-700 text-white"}
      animate-fade-in`}
    >
      {message}
    </div>
  );
}

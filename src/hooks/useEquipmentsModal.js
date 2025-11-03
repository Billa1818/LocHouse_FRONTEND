import { useState, useEffect, useRef } from "react";

export const useEquipmentsModal = (initialEquipments = []) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(initialEquipments);
  const modalRef = useRef(null);

  const open = () => setShow(true);
  const close = () => setShow(false);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const reset = () => setSelected([]);
  const apply = (onApply) => {
    onApply(selected);
    close();
  };

  // Fermer avec Échap ou clic dehors
  useEffect(() => {
    const esc = e => e.key === "Escape" && close();
    const outside = e => modalRef.current && !modalRef.current.contains(e.target) && close();
    if (show) {
      document.addEventListener("keydown", esc);
      document.addEventListener("mousedown", outside);
    }
    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("mousedown", outside);
    };
  }, [show]);

  return { show, selected, modalRef, open, close, toggle, reset, apply };
};
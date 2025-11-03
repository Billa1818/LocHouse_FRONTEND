import { useState, useCallback } from "react";

export const useForm = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = () => setFormData(initialData);

  return { formData, setFormData, handleChange, resetForm };
};
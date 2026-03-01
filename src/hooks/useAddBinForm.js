import { useState } from 'react';

export const useAddBinForm = (initialState) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`EcoBin "${formData.binId}" at "${formData.location}" has been added!`);
    setShowModal(false);
    setFormData(initialState); // Reset form
  };

  const toggleModal = (state) => setShowModal(state);

  return { showModal, toggleModal, formData, handleFormChange, handleFormSubmit };
};
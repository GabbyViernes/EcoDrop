import { useState } from 'react';
import useBins from './useBins';

export function useAddBinForm() {
  const { bins, addBin, editBin, deleteBin } = useBins();
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    binId: '', location: '', address: '', coordinates: '',
    capacity: '', type: '', collectionSchedule: '',
  });

  function showToast(message) {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3500);
  }

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newBin = {
      id: formData.binId,
      location: formData.location,
      address: formData.address,
      status: 'Empty',
      fillLevel: 0,
      lastEmptied: 'Just Deployed',
      nextCollection: formData.collectionSchedule,
      capacity: formData.capacity,
      currentLoad: '0 kg',
      type: formData.type,
      coordinates: formData.coordinates,
    };

    addBin(newBin);
    showToast(`✅ EcoBin "${formData.binId}" added at ${formData.location}!`);

    setShowModal(false);
    setFormData({
      binId: '', location: '', address: '', coordinates: '',
      capacity: '', type: '', collectionSchedule: '',
    });
  }

  function handleEditBin(binId, updatedFormData) {
    editBin(binId, updatedFormData);
    showToast(`✏️ EcoBin "${updatedFormData.binId}" updated successfully!`);
  }

  function handleDeleteBin(binId) {
    deleteBin(binId);
    showToast(`🗑️ EcoBin "${binId}" has been removed.`);
  }

  return {
    bins,
    showModal,
    setShowModal,
    formData,
    handleFormChange,
    handleFormSubmit,
    handleEditBin,
    handleDeleteBin,
    toastMessage,
  };
}
import { useState } from 'react';
import { useBins } from '../context/BinContext';

export function useAddBinForm() {
  const { bins, addBin } = useBins(); 
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    binId: '', location: '', address: '', coordinates: '', capacity: '', type: '', collectionSchedule: '',
  });

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
    alert(`EcoBin "${formData.binId}" at "${formData.location}" has been added!`);
    
    setShowModal(false);
    setFormData({
      binId: '', location: '', address: '', coordinates: '', capacity: '', type: '', collectionSchedule: '',
    });
  }

  return {
    bins,
    showModal,
    setShowModal,
    formData,
    handleFormChange,
    handleFormSubmit
  };
}
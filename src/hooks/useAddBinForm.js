import { useState, useEffect } from 'react';

const INITIAL_BINS = [
  {
    id: 'BIN-001',
    location: 'Limketkai Center',
    address: 'Limketkai Dr, Cagayan de Oro, 9000 Misamis Oriental',
    status: 'Critical',
    fillLevel: 85,
    lastEmptied: '2026-02-01 08:00 AM',
    nextCollection: '2026-02-15 08:00 AM',
    capacity: '20 kg',
    currentLoad: '17 kg',
    type: 'Polyethylene',
    coordinates: '8.4822° N, 124.6472° E',
  },
  {
    id: 'BIN-002',
    location: 'SM Downtown Premier',
    address: 'Claro M. Recto Ave, Cagayan de Oro',
    status: 'Normal',
    fillLevel: 45,
    lastEmptied: '2026-02-12 10:30 AM',
    nextCollection: '2026-02-16 08:00 AM',
    capacity: '20 kg',
    currentLoad: '9 kg',
    type: 'Mixed Plastic',
    coordinates: '8.4855° N, 124.6522° E',
  }
];

export function useAddBinForm() {
  const [showModal, setShowModal] = useState(false);
  
  // 1. Load bins from local storage OR use INITIAL_BINS if it's their first time visiting
  const [bins, setBins] = useState(() => {
    const savedBins = localStorage.getItem('ecodrop_saved_bins');
    if (savedBins) {
      return JSON.parse(savedBins);
    }
    return INITIAL_BINS;
  });

  const [formData, setFormData] = useState({
    binId: '', location: '', address: '', coordinates: '', capacity: '', type: '', collectionSchedule: '',
  });

  // 2. Automatically save to local storage every time the 'bins' array changes
  useEffect(() => {
    localStorage.setItem('ecodrop_saved_bins', JSON.stringify(bins));
  }, [bins]);

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

    setBins([...bins, newBin]);
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
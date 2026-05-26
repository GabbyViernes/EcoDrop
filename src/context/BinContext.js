import React, { createContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../api/config';

export const BinContext = createContext();

export const BinProvider = ({ children }) => {
  const [bins, setBins] = useState([]);

  // Fetch bins from Django and set up polling
  useEffect(() => {
    const fetchBins = () => {
      fetch(`${API_BASE_URL}/bins/`)
        .then(res => res.json())
        .then(data => {
          const liveBins = data.map(bin => ({
            id: bin.bin_id || `BIN-${bin.id}`,
            location: bin.location,
            address: bin.address,
            status: bin.status,
            fillLevel: bin.fullness_percentage,
            capacity: bin.capacity,
            type: bin.bin_type,
            nextCollection: bin.collection_schedule,
            lastEmptied: 'Not recorded', 
            currentLoad: '0 kg',
            coordinates: `${bin.latitude || 0}°, ${bin.longitude || 0}°`
          }));
          setBins(liveBins);
        })
        .catch(err => console.error("Failed to fetch bins:", err));
    };

    fetchBins(); // Initial fetch
    const interval = setInterval(fetchBins, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const addBin = async (newBin) => {
    // Send to Django API
    const response = await fetch(`${API_BASE_URL}/bins/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('ecodropToken')}`
      },
      body: JSON.stringify({
        bin_id: newBin.id,
        location: newBin.location,
        address: newBin.address,
        capacity: newBin.capacity,
        bin_type: newBin.type,
        status: 'Normal',
        fullness_percentage: 0
      })
    });

    if (response.ok) {
      const savedApiBin = await response.json();
      setBins(prev => [...prev, { ...newBin, dbId: savedApiBin.id }]);
    }
  };

  const editBin = (binId, updatedFormData) => {
    setBins((prevBins) =>
      prevBins.map((bin) =>
        bin.id !== binId ? bin : {
          ...bin,
          id: updatedFormData.binId || bin.id,
          location: updatedFormData.location,
          address: updatedFormData.address,
          coordinates: updatedFormData.coordinates,
          capacity: updatedFormData.capacity,
          type: updatedFormData.type,
          nextCollection: updatedFormData.collectionSchedule,
        }
      )
    );
  };

  const deleteBin = (binId) => {
    setBins((prevBins) => prevBins.filter((bin) => bin.id !== binId));
  };

  return (
    <BinContext.Provider value={{ bins, addBin, editBin, deleteBin }}>
      {children}
    </BinContext.Provider>
  );
};
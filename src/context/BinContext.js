import React, { createContext, useState, useEffect, useContext } from 'react';

export const BinContext = createContext();

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

export const BinProvider = ({ children }) => {
  const [bins, setBins] = useState(() => {
    const savedBins = localStorage.getItem('ecodrop_saved_bins');
    if (savedBins) {
      return JSON.parse(savedBins);
    }
    return INITIAL_BINS;
  });

  useEffect(() => {
    localStorage.setItem('ecodrop_saved_bins', JSON.stringify(bins));
  }, [bins]);

  const addBin = (newBin) => {
    setBins((prevBins) => [...prevBins, newBin]);
  };

  return (
    <BinContext.Provider value={{ bins, addBin }}>
      {children}
    </BinContext.Provider>
  );
};


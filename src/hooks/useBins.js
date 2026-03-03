import { useContext } from 'react';
import { BinContext } from '../context/BinContext';

const useBins = () => useContext(BinContext);

export default useBins;

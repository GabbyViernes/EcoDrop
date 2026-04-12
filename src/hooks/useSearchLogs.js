import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchLogs = (initialData) => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const filteredData = useMemo(() => {
    if (!searchQuery || !initialData) return initialData;
    const lowerQuery = searchQuery.toLowerCase();
    
    return initialData.filter((item) => {
      // Format the ID as "TXN-001" to match what the user sees in the UI
      const formattedId = `TXN-${String(item.id).padStart(3, '0')}`.toLowerCase();
      
      // Use the display fields from your Django Serializer
      const userName = (item.user_display || '').toLowerCase();
      const binId = (item.bin_display || '').toLowerCase();
      const material = (item.material || '').toLowerCase();

      return (
        formattedId.includes(lowerQuery) ||
        userName.includes(lowerQuery) ||
        binId.includes(lowerQuery) ||
        material.includes(lowerQuery) // Added material search as well!
      );
    });
  }, [searchQuery, initialData]);

  return { filteredData };
};
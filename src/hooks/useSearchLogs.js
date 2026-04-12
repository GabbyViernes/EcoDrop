import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchLogs = (initialData) => {
  const [searchParams] = useSearchParams();
  
  // .trim() handles cases where spaces are accidentally added to the search query
  const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

  const filteredData = useMemo(() => {
    // If no data or search query, return everything immediately
    if (!searchQuery || !initialData) return initialData;
    
    return initialData.filter((item) => {
      // 1. Format the UI-friendly ID
      const formattedId = `TXN-${String(item.id).padStart(3, '0')}`.toLowerCase();
      
      // 2. Safely capture the backend display fields
      const userName = (item.user_display || '').toLowerCase();
      const binId = (item.bin_display || '').toLowerCase();
      const material = (item.material || '').toLowerCase();

      // 3. Return true if ANY of the fields match the query
      return (
        formattedId.includes(searchQuery) ||
        userName.includes(searchQuery) ||
        binId.includes(searchQuery) ||
        material.includes(searchQuery)
      );
    });
  }, [searchQuery, initialData]);

  return { filteredData, searchQuery };
};

export default useSearchLogs;
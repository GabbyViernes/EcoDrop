import { useState, useMemo } from 'react';

export const useSearchLogs = (initialData) => {
  const [searchQuery, setSearchQuery] = useState('');

  // useMemo prevents recalculating the filter on every render unless dependencies change
  const filteredData = useMemo(() => {
    if (!searchQuery) return initialData;
    const lowerQuery = searchQuery.toLowerCase();
    
    return initialData.filter(
      (item) =>
        item.id.toLowerCase().includes(lowerQuery) ||
        item.user.toLowerCase().includes(lowerQuery) ||
        item.binId.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, initialData]);

  return { searchQuery, setSearchQuery, filteredData };
};
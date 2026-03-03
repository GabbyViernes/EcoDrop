import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchLogs = (initialData) => {
 
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

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

  
  return { filteredData };
};
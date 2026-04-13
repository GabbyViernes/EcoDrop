import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchLogs = (initialData) => {
    const [searchParams] = useSearchParams();
    const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

    const filteredData = useMemo(() => {
        if (!searchQuery || !initialData) return initialData;
        
        return initialData.filter((item) => {
            const formattedId = `TXN-${String(item.id).padStart(3, '0')}`.toLowerCase();
            const userName = (item.user_display || '').toLowerCase();
            const binId = (item.bin_display || '').toLowerCase();
            const material = (item.material || '').toLowerCase();

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
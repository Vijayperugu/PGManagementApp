import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../services/roomServices';

export const useRooms = (branchId: number) => {
  return useQuery({
    queryKey: ['rooms', branchId],
    queryFn: () => getRooms(branchId),
    select: response => response.data,
    enabled: !!branchId,
  });
};
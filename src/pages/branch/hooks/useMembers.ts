import { useQuery } from '@tanstack/react-query';
import { getMembers } from '../services/memberService';



export const useMembers = (roomId: number) => {
  return useQuery({
    queryKey: ['members', roomId],
    queryFn: () => getMembers(roomId),
    select: response => response.data,
    enabled: !!roomId,
  });
};


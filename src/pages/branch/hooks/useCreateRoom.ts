import { Alert } from 'react-native';

import { useMutation, useQueryClient } from '@tanstack/react-query';


import { RoomRequest } from '../types/room';
import { createRoom } from '../services/roomServices';

export const useCreateRoom = (branchId: number,closeModal: () => void,) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoomRequest) =>
      createRoom(branchId, data),
    onSuccess: response => {
      queryClient.invalidateQueries({
        queryKey: ['rooms', branchId],
      });
      closeModal();
      Alert.alert('Success', response.message);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        'Failed to create room';
      Alert.alert('Error', message);
    },
  });
};
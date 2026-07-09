import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RoomRequest } from '../types/room';
import { createRoom, deleteRoom } from '../services/roomServices';

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
export const useDeleteRoom = (branchId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (branchId:number) => deleteRoom(branchId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rooms', branchId],
      });
      Alert.alert('Success Deleted Room',);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        'Failed to Delete room';
      Alert.alert('Error', message);
    },
  });
};


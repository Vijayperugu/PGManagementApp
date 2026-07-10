import { Alert } from 'react-native';

import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { MemberRequest } from '../types/members';
import { createMember, deleteMember, updateMember } from '../services/memberService';



export const useCreateMember = (roomId: number,branchId: number, closeModal: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: MemberRequest) => createMember(roomId, data),
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ['members', roomId],
            });
            queryClient.invalidateQueries({
                queryKey: ["rooms", branchId],
            });
            closeModal();
            Alert.alert('Success', response.message);
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? 'Failed to create member';
            Alert.alert('Error', message);
        },
    });
};

export const useUpdateMember = (roomId: number, closeModal: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: MemberRequest }) =>
            updateMember(id, data),
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ['members', roomId],
            });
            closeModal();
            Alert.alert('Success', response.message);
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? 'Failed to update member';
            Alert.alert('Error', message);
        },
    });
};


export const useDeleteMember = (roomId: number,branchId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (memberId: number) => deleteMember(memberId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['members', roomId],
            });
            queryClient.invalidateQueries({
                queryKey: ["rooms", branchId],
            });
            Alert.alert('Success deleted');
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? 'Failed to delete member';
            Alert.alert('Error', message);
        },
    });
};

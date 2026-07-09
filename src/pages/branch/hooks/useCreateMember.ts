import { Alert } from 'react-native';

import {
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { MemberRequest } from '../types/members';
import { createMember, deleteMember } from '../services/memberService';



export const useCreateMember = (roomId: number,closeModal: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: MemberRequest) =>createMember(roomId, data),
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ['members', roomId],
            });
            closeModal();
            Alert.alert('Success', response.message);
        },
        onError: (error: any) => {
            const message =error?.response?.data?.message ??'Failed to create member';
            Alert.alert('Error', message);
        },
    });
};


export const useDeleteMember =( roomId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (memberId: number) => deleteMember(memberId),
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: ['members', roomId],
            });
            Alert.alert('Success deleted');
        },
        onError: (error: any) => {
            const message =error?.response?.data?.message ??'Failed to delete member';
            Alert.alert('Error', message);
        },
    });
};
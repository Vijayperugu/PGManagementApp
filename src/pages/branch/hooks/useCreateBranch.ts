import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BranchRequest } from "../types/branch";
import { createBranch, deleteBranch } from "../services/branchServices";
import { Alert } from "react-native";




export const useCreateBranch = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: BranchRequest) => createBranch(data),
        onSuccess: response => {
            queryClient.invalidateQueries({
                queryKey: ["branch"]
            })
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? 'Failed to create branch';
            Alert.alert('Error', message);
        }
    })
}


export const useDeleteBranch =()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:(branchId:number)=>deleteBranch(branchId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['branch'],
            });
            Alert.alert('Successfully Deleted');
        },
        onError: (error: any) => {
            const message =error?.response?.data?.message ??'Failed to delete Brach';
            Alert.alert('Error', message);
        },
        

    })
}
import { api } from '../../../api/axios';
import {BranchListResponse,BranchRequest,BranchResponse} from '../types/branch';

export const getBranches = async (): Promise<BranchListResponse> => {
  const response = await api.get<BranchListResponse>('/branches');
  return response.data;
};

export const createBranch = async ( data: BranchRequest): Promise<BranchResponse> => {
  const response = await api.post<BranchResponse>(
    '/branches',
    data,
  );

  return response.data;
};

export const updateBranch = async (id: number,data: BranchRequest): Promise<BranchResponse> => {
  const response = await api.put<BranchResponse>(
    `/branches/${id}`,
    data,
  );

  return response.data;
};


export const deleteBranch = async (id: number): Promise<void> => {
    await api.delete(`/branches/${id}`);
};
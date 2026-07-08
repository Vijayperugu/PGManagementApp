import { ApiResponse } from "../../auth/types/auth";


export interface Branch {
  id: number;
  name: string;
  address: string;
  totalRooms: number;
}

export interface BranchRequest {
  name: string;
  address: string;
}

export type BranchResponse = ApiResponse<Branch>;
export type BranchListResponse = ApiResponse<Branch[]>;
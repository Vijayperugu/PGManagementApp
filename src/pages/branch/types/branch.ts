import { ApiResponse } from "../../auth/types/auth";


export interface BranchType {
  id: number;
  name: string;
  address: string;
  totalFloors?: number;
  totalRooms: number;
}

export interface BranchRequest {
  name: string;
  address: string;
}

export type BranchResponse = ApiResponse<BranchType>;
export type BranchListResponse = ApiResponse<BranchType[]>;

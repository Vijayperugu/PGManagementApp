import { ApiResponse } from '../../auth/types/auth';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface Member {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  occupation: string;
  address: string;
  joiningDate: string;
  roomId: number;
}

export interface MemberRequest {
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  occupation: string;
  address: string;
  joiningDate: string;
}

export type MemberResponse = ApiResponse<Member>;
export type MemberListResponse = ApiResponse<Member[]>;
import { ApiResponse } from '../../auth/types/auth';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface Member {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  aadhaarNumber: string;
  college: string;
  course: string;
  joiningDate: string;
  photoUrl: string | null;
  roomId: number;
}

export interface MemberRequest {
  name: string;
  age: number;
  gender: Gender;
  phone: string;
  aadhaarNumber: string;
  college: string;
  course: string;
  joiningDate: string;
  photoUrl?: string;
}

export type MemberResponse = ApiResponse<Member>;

export type MemberListResponse = ApiResponse<Member[]>;
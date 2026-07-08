import { api } from "../../../api/axios";
import { MemberListResponse, MemberRequest, MemberResponse } from "../types/members";


export const getMembers = async (roomId: number): Promise<MemberListResponse> => {
  const response = await api.get<MemberListResponse>(
    `/rooms/${roomId}/members`,
  );

  return response.data;
};

export const createMember = async (roomId: number,data: MemberRequest): Promise<MemberResponse> => {
  const response = await api.post<MemberResponse>(
    `/rooms/${roomId}/members`,
    data,
  );

  return response.data;
};

export const updateMember = async (memberId: number,data: MemberRequest): Promise<MemberResponse> => {
  const response = await api.put<MemberResponse>(
    `/members/${memberId}`,
    data,
  );

  return response.data;
};

export const deleteMember = async (memberId: number): Promise<void> => {
  await api.delete(`/members/${memberId}`);
};
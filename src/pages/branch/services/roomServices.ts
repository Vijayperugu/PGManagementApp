
import { api } from '../../../api/axios';
import {RoomRequest,RoomResponse,RoomListResponse} from '../types/room';

export const getRooms = async (
  branchId: number,
): Promise<RoomListResponse> => {
  const response = await api.get<RoomListResponse>(
    `/branches/${branchId}/rooms`,
  );

  return response.data;
};

export const createRoom = async (
  branchId: number,
  data: RoomRequest,
): Promise<RoomResponse> => {
  const response = await api.post<RoomResponse>(
    `/branches/${branchId}/rooms`,
    data,
  );

  return response.data;
};

export const updateRoom = async (
  roomId: number,
  data: RoomRequest,
): Promise<RoomResponse> => {
  const response = await api.put<RoomResponse>(
    `/rooms/${roomId}`,
    data,
  );

  return response.data;
};

export const deleteRoom = async (
  roomId: number,
): Promise<void> => {
  await api.delete(`/rooms/${roomId}`);
};
import { ApiResponse } from "../../auth/types/auth";


export interface Room {
  id: number;
  roomNumber: string;
  floor: number;
  capacity: number;
  rent: number;
  branchId: number;
  occupied: number;
  availableBeds: number;
}

export interface RoomRequest {
  roomNumber: string;
  floor: number;
  capacity: number;
  rent: number;
}

export type RoomResponse = ApiResponse<Room>;

export type RoomListResponse = ApiResponse<Room[]>;
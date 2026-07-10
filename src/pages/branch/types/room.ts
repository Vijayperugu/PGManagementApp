import { ApiResponse } from "../../auth/types/auth";


export interface Room {
  id: number;
  roomNumber: string;
  floor: string;
  capacity: string;
  rent: string;
  branchId: number;
  occupied: number;
  availableBeds: string;
}

export interface RoomRequest {
  roomNumber: string;
  floor: number;
  capacity: number;
  rent: number;
}

export type RoomResponse = ApiResponse<Room>;

export type RoomListResponse = ApiResponse<Room[]>;
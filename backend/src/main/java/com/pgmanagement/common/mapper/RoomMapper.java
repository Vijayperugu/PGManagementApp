package com.pgmanagement.common.mapper;

import com.pgmanagement.room.dto.RoomResponse;
import com.pgmanagement.room.entity.Room;

public final class RoomMapper {

    private RoomMapper() {
    }

    public static RoomResponse toResponse(Room room) {
        int occupied = room.getMembers() == null ? 0 : room.getMembers().size();
        int availableBeds = Math.max(room.getCapacity() - occupied, 0);
        return new RoomResponse(
                room.getId(),
                room.getRoomNumber(),
                room.getFloor(),
                room.getCapacity(),
                room.getBranch().getId(),
                occupied,
                availableBeds
        );
    }
}

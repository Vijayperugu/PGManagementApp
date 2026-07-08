package com.pgmanagement.room.dto;

public record RoomResponse(
        Long id,
        String roomNumber,
        Integer floor,
        Integer capacity,
        Long branchId,
        int occupied,
        int availableBeds
) {
}

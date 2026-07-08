package com.pgmanagement.room.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RoomRequest(
        @NotBlank(message = "Room number is required")
        @Size(max = 30, message = "Room number must be less than 30 characters")
        String roomNumber,

        @NotNull(message = "Floor is required")
        Integer floor,

        @NotNull(message = "Capacity is required")
        @Min(value = 1, message = "Capacity must be at least 1")
        @Max(value = 50, message = "Capacity must be less than or equal to 50")
        Integer capacity
) {
}

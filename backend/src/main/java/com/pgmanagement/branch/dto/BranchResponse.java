package com.pgmanagement.branch.dto;

public record BranchResponse(
        Long id,
        String name,
        String address,
        String phone,
        int totalRooms
) {
}

package com.pgmanagement.common.mapper;

import com.pgmanagement.branch.dto.BranchResponse;
import com.pgmanagement.branch.entity.Branch;

public final class BranchMapper {

    private BranchMapper() {
    }

    public static BranchResponse toResponse(Branch branch) {
        int totalRooms = branch.getRooms() == null ? 0 : branch.getRooms().size();
        return new BranchResponse(
                branch.getId(),
                branch.getName(),
                branch.getAddress(),
                branch.getPhone(),
                totalRooms
        );
    }
}

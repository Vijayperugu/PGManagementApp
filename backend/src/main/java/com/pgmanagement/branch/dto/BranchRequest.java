package com.pgmanagement.branch.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record BranchRequest(
        @NotBlank(message = "Branch name is required")
        @Size(max = 120, message = "Branch name must be less than 120 characters")
        String name,

        @NotBlank(message = "Address is required")
        @Size(max = 500, message = "Address must be less than 500 characters")
        String address,

        @Size(max = 20, message = "Phone must be less than 20 characters")
        String phone
) {
}

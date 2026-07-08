package com.pgmanagement.member.dto;

import com.pgmanagement.member.entity.Gender;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record MemberRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 120, message = "Name must be less than 120 characters")
        String name,

        @NotNull(message = "Age is required")
        @Min(value = 1, message = "Age must be at least 1")
        @Max(value = 120, message = "Age must be less than or equal to 120")
        Integer age,

        @NotNull(message = "Gender is required")
        Gender gender,

        @NotBlank(message = "Phone is required")
        @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone must be a valid 10 digit Indian mobile number")
        String phone,

        @NotBlank(message = "Aadhaar number is required")
        @Pattern(regexp = "^\\d{12}$", message = "Aadhaar number must be 12 digits")
        String aadhaarNumber,

        @Size(max = 150, message = "College must be less than 150 characters")
        String college,

        @Size(max = 150, message = "Course must be less than 150 characters")
        String course,

        @NotNull(message = "Joining date is required")
        LocalDate joiningDate,

        @Size(max = 500, message = "Photo URL must be less than 500 characters")
        String photoUrl
) {
}

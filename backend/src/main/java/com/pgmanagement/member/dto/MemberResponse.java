package com.pgmanagement.member.dto;

import com.pgmanagement.member.entity.Gender;

import java.time.LocalDate;

public record MemberResponse(
        Long id,
        String name,
        Integer age,
        Gender gender,
        String phone,
        String aadhaarNumber,
        String college,
        String course,
        LocalDate joiningDate,
        String photoUrl,
        Long roomId
) {
}

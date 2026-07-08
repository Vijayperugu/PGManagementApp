package com.pgmanagement.common.mapper;

import com.pgmanagement.member.dto.MemberResponse;
import com.pgmanagement.member.entity.Member;

public final class MemberMapper {

    private MemberMapper() {
    }

    public static MemberResponse toResponse(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getName(),
                member.getAge(),
                member.getGender(),
                member.getPhone(),
                member.getAadhaarNumber(),
                member.getCollege(),
                member.getCourse(),
                member.getJoiningDate(),
                member.getPhotoUrl(),
                member.getRoom().getId()
        );
    }
}

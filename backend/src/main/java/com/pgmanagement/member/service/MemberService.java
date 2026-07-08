package com.pgmanagement.member.service;

import com.pgmanagement.auth.entity.User;
import com.pgmanagement.auth.security.CurrentUserService;
import com.pgmanagement.common.exception.BadRequestException;
import com.pgmanagement.common.exception.ResourceNotFoundException;
import com.pgmanagement.common.mapper.MemberMapper;
import com.pgmanagement.member.dto.MemberRequest;
import com.pgmanagement.member.dto.MemberResponse;
import com.pgmanagement.member.entity.Member;
import com.pgmanagement.member.repository.MemberRepository;
import com.pgmanagement.room.entity.Room;
import com.pgmanagement.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final RoomService roomService;
    private final CurrentUserService currentUserService;

    @Transactional(readOnly = true)
    public List<MemberResponse> getMembersByRoom(Long roomId) {
        Room room = roomService.findCurrentOwnerRoom(roomId);
        return memberRepository.findByRoomOrderByIdDesc(room)
                .stream()
                .map(MemberMapper::toResponse)
                .toList();
    }

    @Transactional
    public MemberResponse createMember(Long roomId, MemberRequest request) {
        Room room = roomService.findCurrentOwnerRoom(roomId);
        validateRoomHasCapacity(room);
        Member member = buildMember(request, room);
        Member savedMember = memberRepository.save(member);
        log.info("Created member {} in room {}", savedMember.getId(), roomId);
        return MemberMapper.toResponse(savedMember);
    }

    @Transactional
    public MemberResponse updateMember(Long id, MemberRequest request) {
        Member member = findCurrentOwnerMember(id);
        member.setName(request.name());
        member.setAge(request.age());
        member.setGender(request.gender());
        member.setPhone(request.phone());
        member.setAadhaarNumber(request.aadhaarNumber());
        member.setCollege(request.college());
        member.setCourse(request.course());
        member.setJoiningDate(request.joiningDate());
        member.setPhotoUrl(request.photoUrl());
        return MemberMapper.toResponse(memberRepository.save(member));
    }

    @Transactional
    public void deleteMember(Long id) {
        Member member = findCurrentOwnerMember(id);
        memberRepository.delete(member);
        log.info("Deleted member {}", id);
    }

    private Member findCurrentOwnerMember(Long id) {
        User owner = currentUserService.getCurrentUser();
        return memberRepository.findByIdAndRoomBranchOwnerId(id, owner.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));
    }

    private void validateRoomHasCapacity(Room room) {
        long occupied = memberRepository.countByRoom(room);
        if (occupied >= room.getCapacity()) {
            throw new BadRequestException("Room is already full");
        }
    }

    private Member buildMember(MemberRequest request, Room room) {
        return Member.builder()
                .name(request.name())
                .age(request.age())
                .gender(request.gender())
                .phone(request.phone())
                .aadhaarNumber(request.aadhaarNumber())
                .college(request.college())
                .course(request.course())
                .joiningDate(request.joiningDate())
                .photoUrl(request.photoUrl())
                .room(room)
                .build();
    }
}

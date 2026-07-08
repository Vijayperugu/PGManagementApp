package com.pgmanagement.room.service;

import com.pgmanagement.auth.entity.User;
import com.pgmanagement.auth.security.CurrentUserService;
import com.pgmanagement.branch.entity.Branch;
import com.pgmanagement.branch.service.BranchService;
import com.pgmanagement.common.exception.BadRequestException;
import com.pgmanagement.common.exception.ResourceNotFoundException;
import com.pgmanagement.common.mapper.RoomMapper;
import com.pgmanagement.member.repository.MemberRepository;
import com.pgmanagement.room.dto.RoomRequest;
import com.pgmanagement.room.dto.RoomResponse;
import com.pgmanagement.room.entity.Room;
import com.pgmanagement.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;
    private final BranchService branchService;
    private final CurrentUserService currentUserService;

    @Transactional(readOnly = true)
    public List<RoomResponse> getRoomsByBranch(Long branchId) {
        Branch branch = branchService.findCurrentOwnerBranch(branchId);
        return roomRepository.findByBranchOrderByFloorAscRoomNumberAsc(branch)
                .stream()
                .map(RoomMapper::toResponse)
                .toList();
    }

    @Transactional
    public RoomResponse createRoom(Long branchId, RoomRequest request) {
        Branch branch = branchService.findCurrentOwnerBranch(branchId);
        Room room = Room.builder()
                .roomNumber(request.roomNumber())
                .floor(request.floor())
                .capacity(request.capacity())
                .branch(branch)
                .build();
        Room savedRoom = roomRepository.save(room);
        log.info("Created room {} in branch {}", savedRoom.getId(), branchId);
        return RoomMapper.toResponse(savedRoom);
    }

    @Transactional
    public RoomResponse updateRoom(Long id, RoomRequest request) {
        Room room = findCurrentOwnerRoom(id);
        long occupied = memberRepository.countByRoom(room);
        if (request.capacity() < occupied) {
            throw new BadRequestException("Room capacity cannot be less than current member count");
        }
        room.setRoomNumber(request.roomNumber());
        room.setFloor(request.floor());
        room.setCapacity(request.capacity());
        return RoomMapper.toResponse(roomRepository.save(room));
    }

    @Transactional
    public void deleteRoom(Long id) {
        Room room = findCurrentOwnerRoom(id);
        roomRepository.delete(room);
        log.info("Deleted room {}", id);
    }

    @Transactional(readOnly = true)
    public Room findCurrentOwnerRoom(Long id) {
        User owner = currentUserService.getCurrentUser();
        return roomRepository.findByIdAndBranchOwnerId(id, owner.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
    }
}

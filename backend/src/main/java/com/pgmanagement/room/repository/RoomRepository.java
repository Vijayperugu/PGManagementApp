package com.pgmanagement.room.repository;

import com.pgmanagement.branch.entity.Branch;
import com.pgmanagement.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByBranchOrderByFloorAscRoomNumberAsc(Branch branch);

    Optional<Room> findByIdAndBranchOwnerId(Long id, Long ownerId);
}

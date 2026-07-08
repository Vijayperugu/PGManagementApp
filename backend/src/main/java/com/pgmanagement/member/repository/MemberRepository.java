package com.pgmanagement.member.repository;

import com.pgmanagement.member.entity.Member;
import com.pgmanagement.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    List<Member> findByRoomOrderByIdDesc(Room room);

    long countByRoom(Room room);

    Optional<Member> findByIdAndRoomBranchOwnerId(Long id, Long ownerId);
}

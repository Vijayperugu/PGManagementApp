package com.pgmanagement.branch.repository;

import com.pgmanagement.auth.entity.User;
import com.pgmanagement.branch.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BranchRepository extends JpaRepository<Branch, Long> {

    List<Branch> findByOwnerOrderByIdDesc(User owner);

    Optional<Branch> findByIdAndOwner(Long id, User owner);
}

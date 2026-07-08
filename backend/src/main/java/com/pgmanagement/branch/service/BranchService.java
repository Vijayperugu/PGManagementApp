package com.pgmanagement.branch.service;

import com.pgmanagement.auth.entity.User;
import com.pgmanagement.auth.security.CurrentUserService;
import com.pgmanagement.branch.dto.BranchRequest;
import com.pgmanagement.branch.dto.BranchResponse;
import com.pgmanagement.branch.entity.Branch;
import com.pgmanagement.branch.repository.BranchRepository;
import com.pgmanagement.common.exception.ResourceNotFoundException;
import com.pgmanagement.common.mapper.BranchMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BranchService {

    private final BranchRepository branchRepository;
    private final CurrentUserService currentUserService;

    @Transactional(readOnly = true)
    public List<BranchResponse> getBranches() {
        User owner = currentUserService.getCurrentUser();
        return branchRepository.findByOwnerOrderByIdDesc(owner)
                .stream()
                .map(BranchMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public BranchResponse getBranch(Long id) {
        return BranchMapper.toResponse(findCurrentOwnerBranch(id));
    }

    @Transactional
    public BranchResponse createBranch(BranchRequest request) {
        User owner = currentUserService.getCurrentUser();
        Branch branch = Branch.builder()
                .name(request.name())
                .address(request.address())
                .phone(request.phone())
                .owner(owner)
                .build();
        Branch savedBranch = branchRepository.save(branch);
        log.info("Created branch {} for owner {}", savedBranch.getId(), owner.getId());
        return BranchMapper.toResponse(savedBranch);
    }

    @Transactional
    public BranchResponse updateBranch(Long id, BranchRequest request) {
        Branch branch = findCurrentOwnerBranch(id);
        branch.setName(request.name());
        branch.setAddress(request.address());
        branch.setPhone(request.phone());
        return BranchMapper.toResponse(branchRepository.save(branch));
    }

    @Transactional
    public void deleteBranch(Long id) {
        Branch branch = findCurrentOwnerBranch(id);
        branchRepository.delete(branch);
        log.info("Deleted branch {}", id);
    }

    @Transactional(readOnly = true)
    public Branch findCurrentOwnerBranch(Long id) {
        User owner = currentUserService.getCurrentUser();
        return branchRepository.findByIdAndOwner(id, owner)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));
    }
}

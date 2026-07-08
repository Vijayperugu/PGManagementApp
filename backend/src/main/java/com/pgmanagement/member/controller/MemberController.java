package com.pgmanagement.member.controller;

import com.pgmanagement.common.response.ApiResponse;
import com.pgmanagement.member.dto.MemberRequest;
import com.pgmanagement.member.dto.MemberResponse;
import com.pgmanagement.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/api/rooms/{roomId}/members")
    public ResponseEntity<ApiResponse<List<MemberResponse>>> getMembersByRoom(@PathVariable Long roomId) {
        return ResponseEntity.ok(ApiResponse.success("Members fetched successfully", memberService.getMembersByRoom(roomId)));
    }

    @PostMapping("/api/rooms/{roomId}/members")
    public ResponseEntity<ApiResponse<MemberResponse>> createMember(
            @PathVariable Long roomId,
            @Valid @RequestBody MemberRequest request
    ) {
        MemberResponse response = memberService.createMember(roomId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Member created successfully", response));
    }

    @PutMapping("/api/members/{id}")
    public ResponseEntity<ApiResponse<MemberResponse>> updateMember(
            @PathVariable Long id,
            @Valid @RequestBody MemberRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Member updated successfully", memberService.updateMember(id, request)));
    }

    @DeleteMapping("/api/members/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.ok(ApiResponse.success("Member deleted successfully", null));
    }
}

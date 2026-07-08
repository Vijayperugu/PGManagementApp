package com.pgmanagement.room.controller;

import com.pgmanagement.common.response.ApiResponse;
import com.pgmanagement.room.dto.RoomRequest;
import com.pgmanagement.room.dto.RoomResponse;
import com.pgmanagement.room.service.RoomService;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/api/branches/{branchId}/rooms")
    public ResponseEntity<ApiResponse<List<RoomResponse>>> getRoomsByBranch(@PathVariable Long branchId) {
        return ResponseEntity.ok(ApiResponse.success("Rooms fetched successfully", roomService.getRoomsByBranch(branchId)));
    }

    @PostMapping("/api/branches/{branchId}/rooms")
    public ResponseEntity<ApiResponse<RoomResponse>> createRoom(
            @PathVariable Long branchId,
            @Valid @RequestBody RoomRequest request
    ) {
        RoomResponse response = roomService.createRoom(branchId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Room created successfully", response));
    }

    @PutMapping("/api/rooms/{id}")
    public ResponseEntity<ApiResponse<RoomResponse>> updateRoom(
            @PathVariable Long id,
            @Valid @RequestBody RoomRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.success("Room updated successfully", roomService.updateRoom(id, request)));
    }

    @DeleteMapping("/api/rooms/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok(ApiResponse.success("Room deleted successfully", null));
    }
}

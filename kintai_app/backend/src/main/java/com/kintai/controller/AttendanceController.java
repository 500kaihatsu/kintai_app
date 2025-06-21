package com.kintai.controller;

import com.kintai.model.Attendance;
import com.kintai.service.AttendanceService;
import com.kintai.model.User;
import com.kintai.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // フロントエンドのURLを指定
@RequestMapping("api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @Autowired
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    // ✅ 出勤打刻処理（POST）
    @PostMapping("/clock-in")
    public ResponseEntity<?> clockIn(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("認証情報がありません");
        }
        User user = userDetails.getUser();
        attendanceService.clockIn(user);
        return ResponseEntity.ok("出勤打刻しました");
    }

    // ✅ 退勤打刻処理（POST）
    @PostMapping("/clock-out")
    public ResponseEntity<?> clockOut(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("認証情報がありません");
        }
        User user = userDetails.getUser();
        try {
            attendanceService.clockOut(user);
            return ResponseEntity.ok("退勤打刻しました");
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ ログイン中のユーザーの出勤簿（GET）
    @GetMapping("/my-records")
    public ResponseEntity<List<Attendance>> getMyAttendanceRecords(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = userDetails.getUser();
        List<Attendance> records = attendanceService.getByUserId(user.getId());

        return ResponseEntity.ok(records);
    }

    // ✅ 休憩開始処理（POST）
    @PostMapping("/break-start")
    public ResponseEntity<?> startBreak(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("認証情報がありません");
        }

        User user = userDetails.getUser();
        Optional<Attendance> latestRecordOpt = attendanceService.findLatestAttendanceByUserId(user.getId());

        if (latestRecordOpt.isPresent()) {
            Attendance latestRecord = latestRecordOpt.get();

            if (latestRecord.getBreakStartTime() != null) {
                return ResponseEntity.badRequest().body("休憩開始済みです");
            }

            latestRecord.setBreakStartTime(java.time.LocalDateTime.now());
            attendanceService.save(latestRecord);
            return ResponseEntity.ok("休憩開始を記録しました");
        }

        return ResponseEntity.badRequest().body("休憩開始できません");
    }

    // ✅ 休憩終了処理（POST）
    @PostMapping("/break-end")
    public ResponseEntity<?> endBreak(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("認証情報がありません");
        }

        User user = userDetails.getUser();
        Optional<Attendance> latestRecordOpt = attendanceService.findLatestAttendanceByUserId(user.getId());

        if (latestRecordOpt.isPresent()) {
            Attendance latestRecord = latestRecordOpt.get();

            if (latestRecord.getBreakStartTime() == null) {
                return ResponseEntity.badRequest().body("休憩が開始されていません");
            }
            if (latestRecord.getBreakEndTime() != null) {
                return ResponseEntity.badRequest().body("休憩終了済みです");
            }

            latestRecord.setBreakEndTime(java.time.LocalDateTime.now());
            attendanceService.save(latestRecord);
            return ResponseEntity.ok("休憩終了を記録しました");
        }

        return ResponseEntity.badRequest().body("休憩終了できません");
    }

    // ✅ 休憩時間変更処理（管理者のみ）
    @PutMapping("/break-time")
    public ResponseEntity<?> updateBreakTime(@AuthenticationPrincipal CustomUserDetails userDetails,
                                             @RequestParam Long recordId,
                                             @RequestParam int breakMinutes) {

        // 管理者であることをチェック（例: 管理者ロールを持っているか）
        if (!userDetails.getUser().isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("管理者のみ変更できます");
        }

        Optional<Attendance> recordOpt = attendanceService.findById(recordId);
        if (recordOpt.isPresent()) {
            Attendance record = recordOpt.get();
            record.setBreakDuration(Duration.ofMinutes(breakMinutes));
            attendanceService.save(record);
            return ResponseEntity.ok("休憩時間を更新しました");
        }

        return ResponseEntity.badRequest().body("対象の勤怠記録が見つかりません");
    }
}

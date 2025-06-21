package com.kintai.model;

import jakarta.persistence.*;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance_records")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "work_date", nullable = false)
    private LocalDate date;

    @Column(name = "clock_in_time")
    private LocalDateTime clockIn;

    @Column(name = "clock_out_time")
    private LocalDateTime clockOut;

    @Column(name = "break_start_time")
    private LocalDateTime breakStartTime;

    @Column(name = "break_end_time")
    private LocalDateTime breakEndTime;

    @Column(name = "break_duration")
    private Duration breakDuration = Duration.ofHours(1); // デフォルト休憩1時間

    @Column(name = "status")
    @Convert(converter = com.kintai.converter.AttendanceStatusConverter.class)
    private AttendanceStatus status;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", updatable = false, insertable = false)
    private LocalDateTime updatedAt;

    // --- コンストラクタ ---
    public Attendance() {}

    public Attendance(Long userId, LocalDate date, LocalDateTime clockIn, LocalDateTime clockOut) {
        this.userId = userId;
        this.date = date;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
    }

    // --- 総労働時間を計算するメソッド（休憩時間を考慮） ---
    public Duration calculateTotalWorkHours() {
        if (clockIn != null && clockOut != null) {
            Duration workDuration = Duration.between(clockIn, clockOut);
            return workDuration.minus(breakDuration != null ? breakDuration : Duration.ZERO);
        }
        return Duration.ZERO;
    }

    // --- Getter / Setter ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDateTime getClockIn() {
        return clockIn;
    }

    public void setClockIn(LocalDateTime clockIn) {
        this.clockIn = clockIn;
    }

    public LocalDateTime getClockOut() {
        return clockOut;
    }

    public void setClockOut(LocalDateTime clockOut) {
        this.clockOut = clockOut;
    }

    public LocalDateTime getBreakStartTime() {
        return breakStartTime;
    }

    public void setBreakStartTime(LocalDateTime breakStartTime) {
        this.breakStartTime = breakStartTime;
    }

    public LocalDateTime getBreakEndTime() {
        return breakEndTime;
    }

    public void setBreakEndTime(LocalDateTime breakEndTime) {
        this.breakEndTime = breakEndTime;
    }

    public Duration getBreakDuration() {
        return breakDuration;
    }

    public void setBreakDuration(Duration breakDuration) {
        this.breakDuration = breakDuration;
    }

    public AttendanceStatus getStatus() {
        return status;
    }

    public void setStatus(AttendanceStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

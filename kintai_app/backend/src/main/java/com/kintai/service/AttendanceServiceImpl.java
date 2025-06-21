package com.kintai.service;

import com.kintai.model.Attendance;
import com.kintai.model.AttendanceStatus;
import com.kintai.model.User;
import com.kintai.repository.AttendanceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;

    @Autowired
    public AttendanceServiceImpl(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public void clockIn(User user) {
        LocalDate today = LocalDate.now();
        Optional<Attendance> record = attendanceRepository.findByUserIdAndDate(user.getId(), today);
        if (record.isPresent()) {
            throw new IllegalStateException("すでに出勤打刻されています");
        }

        Attendance attendance = new Attendance();
        attendance.setUserId(user.getId());
        attendance.setDate(today);
        attendance.setClockIn(LocalDateTime.now());
        attendance.setStatus(AttendanceStatus.WORKING);

        attendanceRepository.save(attendance);
    }

    @Override
    public void clockOut(User user) {
        Attendance attendance = attendanceRepository.findTopByUserIdOrderByClockInDesc(user.getId());
        if (attendance != null && attendance.getClockOut() == null) {
            attendance.setClockOut(LocalDateTime.now());
            attendanceRepository.save(attendance);
        } else {
            throw new IllegalStateException("出勤記録がないか、すでに退勤済みです");
        }
    }

    @Override
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @Override
    public List<Attendance> getByUserId(Long userId) {
        return attendanceRepository.findByUserIdOrderByDateDesc(userId);
    }

    @Override
    public Optional<Attendance> findLatestAttendanceByUserId(Long userId) {
        return Optional.ofNullable(
            attendanceRepository.findTopByUserIdOrderByClockInDesc(userId)
        );
    }

    @Override
    public Attendance save(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @Override
    public Optional<Attendance> findById(Long id) {
        return attendanceRepository.findById(id);
    }
}


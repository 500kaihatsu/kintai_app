package com.kintai.service;

import com.kintai.model.Attendance;
import com.kintai.model.User;

import java.util.List;
import java.util.Optional;

public interface AttendanceService {

    void clockIn(User user);

    void clockOut(User user);

    List<Attendance> getAllAttendance();

    List<Attendance> getByUserId(Long userId);

    Optional<Attendance> findLatestAttendanceByUserId(Long userId);

    Attendance save(Attendance attendance);

    Optional<Attendance> findById(Long id);
}


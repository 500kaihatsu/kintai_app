package com.kintai.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

import com.kintai.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // 指定日の出勤記録を取得（出勤済みチェック用）
    Optional<Attendance> findByUserIdAndDate(Long userId, LocalDate date);

    // ✅ 最新の出勤記録（休憩開始・終了用）
    Attendance findTopByUserIdOrderByClockInDesc(Long userId);

    // ✅ ログインユーザーの出勤簿（降順で一覧表示用）
    List<Attendance> findByUserIdOrderByDateDesc(Long userId);

    // ✅ 休憩時間を考慮した最新レコード取得（休憩情報を更新するため）
    @Query("SELECT a FROM Attendance a WHERE a.userId = :userId ORDER BY a.clockIn DESC")
    Optional<Attendance> findLatestAttendanceByUserId(Long userId);
}

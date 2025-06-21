package com.kintai.model;

public enum AttendanceStatus {
    WORKING("working"),
    ABSENT("absent"),
    LATE("late"),
    ON_LEAVE("on_leave");

    private final String dbValue;

    AttendanceStatus(String dbValue) {
        this.dbValue = dbValue;
    }

    @Override
    public String toString() {
        return dbValue;
    }
}


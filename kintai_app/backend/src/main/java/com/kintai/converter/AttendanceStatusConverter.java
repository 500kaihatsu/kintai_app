package com.kintai.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import com.kintai.model.AttendanceStatus;

@Converter(autoApply = true)
public class AttendanceStatusConverter implements AttributeConverter<AttendanceStatus, String> {

    @Override
    public String convertToDatabaseColumn(AttendanceStatus attribute) {
        if (attribute == null) return null;
        return attribute.toString();  // AttendanceStatusのtoString()は小文字のDB値を返す
    }

    @Override
    public AttendanceStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        // 小文字のDB値から該当するEnumを返す
        for (AttendanceStatus status : AttendanceStatus.values()) {
            if (status.toString().equals(dbData)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown value: " + dbData);
    }
}


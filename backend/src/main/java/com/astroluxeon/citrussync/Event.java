package com.astroluxeon.citrussync;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import lombok.Data;

import java.util.UUID;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class Event {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String timeZone;
}

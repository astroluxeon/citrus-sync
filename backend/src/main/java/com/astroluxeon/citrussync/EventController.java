package com.astroluxeon.citrussync;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class EventController {
    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping("/ping")
    public Map<String, String> ping() {
        Map<String, String> map = new HashMap<>();
        map.put("status", "pong");
        map.put("message", "Java is listening");
        return map;
    }

    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @GetMapping("/events/{id}")
    public Event findEvent(@PathVariable UUID id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }
}

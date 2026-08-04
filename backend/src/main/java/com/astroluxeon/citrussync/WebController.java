package com.astroluxeon.citrussync;

import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class WebController {
    private final EventRepository eventRepository;

    public WebController(EventRepository eventRepository) {
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
}

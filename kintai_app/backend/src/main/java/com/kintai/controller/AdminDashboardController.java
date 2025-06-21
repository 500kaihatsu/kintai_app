// AdminDashboardController.java
package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    @GetMapping("/dashboard")
    public Map<String, Integer> getDashboardSummary() {
        Map<String, Integer> summary = new HashMap<>();
        summary.put("attendCount", 18);
        summary.put("lateCount", 3);
        summary.put("editRequestCount", 4);
        return summary;
    }
}

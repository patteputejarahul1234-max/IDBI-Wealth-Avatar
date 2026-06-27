package com.idbi.wealthavatar.controller;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @GetMapping("/{id}/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("fullName", "Teja Rahul");
        userMap.put("email", "rahul@example.com");
        Map<String, Object> avatarMap = new HashMap<>();
        avatarMap.put("avatarName", "Growth Champion");
        avatarMap.put("riskProfile", "Aggressive");
        avatarMap.put("currentWealth", 50000);
        avatarMap.put("financialGoal", 1500000);
        response.put("user", userMap);
        response.put("avatar", avatarMap);
        return ResponseEntity.ok(response);
    }
}
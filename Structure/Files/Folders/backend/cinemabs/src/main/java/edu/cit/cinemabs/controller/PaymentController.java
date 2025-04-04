package edu.cit.cinemabs.controller;

import edu.cit.cinemabs.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/intent")
    public ResponseEntity<Map<String, Object>> createPaymentIntent(@RequestBody Map<String, String> request) {
        String amount = request.get("amount");

        if (amount == null || !amount.matches("\\d+")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or missing amount"));
        }

        Map<String, Object> response = paymentService.createPaymentIntent(amount);
        return ResponseEntity.ok(response);
    }

}
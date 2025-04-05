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

    @PostMapping("/method")
    public ResponseEntity<Map<String, Object>> createPaymentMethod(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        String email = request.get("email");
        String phone = request.get("phone");
        String type = request.get("type");

        if (name == null || email == null || phone == null || type == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
        }

        Map<String, Object> response = paymentService.createPaymentMethod(name, email, phone, type);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/intent/attach/{id}")
    public ResponseEntity<Map<String, Object>> attachPaymentIntent(
        @PathVariable("id") String intentId,
        @RequestBody Map<String, String> request
    ) {
        String paymentMethod = request.get("payment_method");
        String clientKey = request.get("client_key");
        String returnUrl = request.get("return_url");

        if (paymentMethod == null || clientKey == null || returnUrl == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
        }

        Map<String, Object> response = paymentService.attachPaymentIntent(intentId, paymentMethod, clientKey, returnUrl);
        return ResponseEntity.ok(response);
    }



}
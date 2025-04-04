package edu.cit.cinemabs.service;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class PaymentService {


    private static final Dotenv dotenv = Dotenv.load();
    private static final String PAYMONGO_SECRET_KEY = dotenv.get("PAYMONGO_API_SECRET_KEY");
    private static final String PAYMONGO_URL = dotenv.get("PAYMONGO_URL");

    public Map<String, Object> createPaymentIntent(String amount) {
        if (PAYMONGO_SECRET_KEY == null || PAYMONGO_SECRET_KEY.isEmpty()) {
            throw new IllegalArgumentException("PayMongo Secret Key is not set.");
        }
        if (PAYMONGO_URL == null || PAYMONGO_URL.isEmpty()) {
            throw new IllegalArgumentException("PayMongo URL is not set.");
        }
    
        RestTemplate restTemplate = new RestTemplate();
    
        HttpHeaders headers = new HttpHeaders();
    
        // Correct Base64 Authorization header
        String encodedAuth = Base64.getEncoder().encodeToString((PAYMONGO_SECRET_KEY + ":").getBytes());
        headers.set("Authorization", "Basic " + encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);
    
        // Prepare the attributes for the Payment Intent
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("amount", Integer.parseInt(amount)); // e.g. 10000 = PHP 100.00
        attributes.put("currency", "PHP");
        attributes.put("payment_method_allowed", List.of("card", "paymaya", "gcash"));
        attributes.put("description", "Cinema Booking Payment");
        attributes.put("statement_descriptor", "CineCity Payment");
    
        // Wrap into request body
        Map<String, Object> data = new HashMap<>();
        data.put("attributes", attributes);
    
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("data", data);
    
        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                PAYMONGO_URL,
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating payment intent: " + e.getMessage());
        }
    }
    
}
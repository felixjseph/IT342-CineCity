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
    private static final String PAYMONGO_URL = dotenv.get("PAYMONGO_PAYMENT_INTENT");
    private static final String PAYMONGO_PAYMENT_METHOD_URL = dotenv.get("PAYMONGO_PAYMENT_METHOD");
    private static final String PAYMONGO_PAYMENT_INTENT_URL = dotenv.get("PAYMONGO_PAYMENT_INTENT");


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

    public Map<String, Object> createPaymentMethod(String name, String email, String phone, String type) {
        if (PAYMONGO_SECRET_KEY == null || PAYMONGO_SECRET_KEY.isEmpty()) {
            throw new IllegalArgumentException("PayMongo Secret Key is not set.");
        }
        if (PAYMONGO_PAYMENT_METHOD_URL == null || PAYMONGO_PAYMENT_METHOD_URL.isEmpty()) {
            throw new IllegalArgumentException("PayMongo Payment Method URL is not set.");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        String encodedAuth = Base64.getEncoder().encodeToString((PAYMONGO_SECRET_KEY + ":").getBytes());
        headers.set("Authorization", "Basic " + encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare the attributes for the Payment Method
        Map<String, Object> billing = new HashMap<>();
        billing.put("name", name);
        billing.put("email", email);
        billing.put("phone", phone);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("billing", billing);
        attributes.put("type", type);

        // Wrap into request body
        Map<String, Object> data = new HashMap<>();
        data.put("attributes", attributes);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("data", data);

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                PAYMONGO_PAYMENT_METHOD_URL,
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating payment method: " + e.getMessage());
        }
    }


    public Map<String, Object> attachPaymentIntent(String intentId, String paymentMethod, String clientKey, String returnUrl) {
        if (PAYMONGO_SECRET_KEY == null || PAYMONGO_SECRET_KEY.isEmpty()) {
            throw new IllegalArgumentException("PayMongo Secret Key is not set.");
        }
        if (PAYMONGO_PAYMENT_INTENT_URL == null || PAYMONGO_PAYMENT_INTENT_URL.isEmpty()) {
            throw new IllegalArgumentException("PayMongo Payment Intent URL is not set.");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        String encodedAuth = Base64.getEncoder().encodeToString((PAYMONGO_SECRET_KEY + ":").getBytes());
        headers.set("Authorization", "Basic " + encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("payment_method", paymentMethod);
        attributes.put("client_key", clientKey);
        attributes.put("return_url", returnUrl);

        Map<String, Object> data = new HashMap<>();
        data.put("attributes", attributes);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("data", data);

        try {
            String attachUrl = PAYMONGO_PAYMENT_INTENT_URL + "/" + intentId + "/attach";
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                attachUrl,
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error attaching payment intent: " + e.getMessage());
        }
    }

    public Map<String, Object> retrievePaymentIntent(String intentId) {
        if (PAYMONGO_SECRET_KEY == null || PAYMONGO_SECRET_KEY.isEmpty()) {
            throw new IllegalArgumentException("PayMongo Secret Key is not set.");
        }
        if (PAYMONGO_PAYMENT_INTENT_URL == null || PAYMONGO_PAYMENT_INTENT_URL.isEmpty()) {
            throw new IllegalArgumentException("PayMongo Payment Intent URL is not set.");
        }
    
        RestTemplate restTemplate = new RestTemplate();
    
        HttpHeaders headers = new HttpHeaders();
        String encodedAuth = Base64.getEncoder().encodeToString((PAYMONGO_SECRET_KEY + ":").getBytes());
        headers.set("Authorization", "Basic " + encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);
    
        try {
            String retrieveUrl = PAYMONGO_PAYMENT_INTENT_URL + "/" + intentId;
    
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                retrieveUrl,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error retrieving payment intent: " + e.getMessage());
        }
    }
    
}
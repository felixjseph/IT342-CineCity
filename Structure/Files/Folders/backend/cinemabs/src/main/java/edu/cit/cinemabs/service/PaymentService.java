package edu.cit.cinemabs.service;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    private final String paymongoSecretKey;
    private final String paymongoUrl;
    private final String paymongoPaymentMethodUrl;
    private final String paymongoPaymentIntentUrl;

    private final RestTemplate restTemplate;

    public PaymentService() {
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

        this.paymongoSecretKey = dotenv.get("PAYMONGO_API_SECRET_KEY");
        this.paymongoUrl = dotenv.get("PAYMONGO_PAYMENT_INTENT");
        this.paymongoPaymentMethodUrl = dotenv.get("PAYMONGO_PAYMENT_METHOD");
        this.paymongoPaymentIntentUrl = dotenv.get("PAYMONGO_PAYMENT_INTENT");

        this.restTemplate = new RestTemplate();
    }

    public Map<String, Object> createPaymentIntent(String amount) {
        validateSecretKeyAndUrl(paymongoSecretKey, paymongoUrl);

        HttpHeaders headers = createHeaders();
        Map<String, Object> requestBody = Map.of(
                "data", Map.of(
                        "attributes", Map.of(
                                "amount", Integer.parseInt(amount),
                                "currency", "PHP",
                                "payment_method_allowed", List.of("card", "paymaya", "gcash"),
                                "description", "Cinema Booking Payment",
                                "statement_descriptor", "CineCity Payment"
                        )
                )
        );

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    paymongoUrl,
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Error creating payment intent: " + e.getMessage(), e);
        }
    }

    public Map<String, Object> createPaymentMethod(String name, String email, String phone, String type) {
        validateSecretKeyAndUrl(paymongoSecretKey, paymongoPaymentMethodUrl);

        HttpHeaders headers = createHeaders();
        Map<String, Object> requestBody = Map.of(
                "data", Map.of(
                        "attributes", Map.of(
                                "billing", Map.of(
                                        "name", name,
                                        "email", email,
                                        "phone", phone
                                ),
                                "type", type
                        )
                )
        );

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    paymongoPaymentMethodUrl,
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Error creating payment method: " + e.getMessage(), e);
        }
    }

    public Map<String, Object> attachPaymentIntent(String intentId, String paymentMethod, String clientKey, String returnUrl) {
        validateSecretKeyAndUrl(paymongoSecretKey, paymongoPaymentIntentUrl);

        HttpHeaders headers = createHeaders();
        Map<String, Object> requestBody = Map.of(
                "data", Map.of(
                        "attributes", Map.of(
                                "payment_method", paymentMethod,
                                "client_key", clientKey,
                                "return_url", returnUrl
                        )
                )
        );

        try {
            String attachUrl = paymongoPaymentIntentUrl + "/" + intentId + "/attach";
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    attachUrl,
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Error attaching payment intent: " + e.getMessage(), e);
        }
    }

    public Map<String, Object> retrievePaymentIntent(String intentId) {
        validateSecretKeyAndUrl(paymongoSecretKey, paymongoPaymentIntentUrl);

        HttpHeaders headers = createHeaders();

        try {
            String retrieveUrl = paymongoPaymentIntentUrl + "/" + intentId;
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    retrieveUrl,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving payment intent: " + e.getMessage(), e);
        }
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String encodedAuth = Base64.getEncoder().encodeToString((paymongoSecretKey + ":").getBytes());
        headers.set("Authorization", "Basic " + encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }

    private void validateSecretKeyAndUrl(String secretKey, String url) {
        if (secretKey == null || secretKey.isEmpty()) {
            throw new IllegalArgumentException("PayMongo Secret Key is not set.");
        }
        if (url == null || url.isEmpty()) {
            throw new IllegalArgumentException("PayMongo URL is not set.");
        }
    }
}

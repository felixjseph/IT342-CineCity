package edu.cit.cinemabs.service;

import edu.cit.cinemabs.entity.Payment;
import edu.cit.cinemabs.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @CacheEvict(value = "payments", allEntries = true)
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Cacheable(value = "payments")
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Cacheable(value = "paymentById", key = "#id")
    public Optional<Payment> getPaymentById(int id) {
        return paymentRepository.findById(id);
    }

    @CacheEvict(value = "payments", key = "#id")
    public Payment updatePayment(int id, Payment newPayment) {
        if (paymentRepository.existsById(id)) {
            newPayment.setPaymentId(id);
            return paymentRepository.save(newPayment);
        }
        return null;
    }

    @CacheEvict(value = "payments", key = "#id")
    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
    }
}

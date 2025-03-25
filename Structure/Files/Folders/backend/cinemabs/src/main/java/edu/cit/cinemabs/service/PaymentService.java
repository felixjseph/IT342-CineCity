package edu.cit.cinemabs.service;

import edu.cit.cinemabs.entity.Payment;
import edu.cit.cinemabs.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(int id) {
        return paymentRepository.findById(id);
    }

    public Payment updatePayment(int id, Payment newPayment) {
        if (paymentRepository.existsById(id)) {
            newPayment.setPaymentId(id);
            return paymentRepository.save(newPayment);
        }
        return null;
    }

    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
    }
}

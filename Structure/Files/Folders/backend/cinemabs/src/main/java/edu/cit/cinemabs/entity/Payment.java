package edu.cit.cinemabs.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;

    private int bookingId;
    private float amount;
    private String status;
    private String paymentMethod;

    @ManyToOne
    @JoinColumn(name = "seatBookingId" , nullable = false)
    private SeatBooking seatBooking;

    public Payment() {
    }

    public Payment(int bookingId, float amount, String status, String paymentMethod, SeatBooking seatBooking) {
        this.bookingId = bookingId;
        this.amount = amount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.seatBooking = seatBooking;
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setSeatBooking(SeatBooking seatBooking) {
        this.seatBooking = seatBooking;
    }

    public SeatBooking seatBooking() {
        return seatBooking;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}

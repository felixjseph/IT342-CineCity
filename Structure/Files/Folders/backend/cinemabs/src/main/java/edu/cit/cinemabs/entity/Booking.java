package edu.cit.cinemabs.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private double amount;
    private String paymentMethod;
    private String status;

    @ManyToOne
    @JoinColumn(name = "showtimeId", nullable = false)
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "seatId", nullable = false)
    private Seat seat;
    
    public Booking() {
        this.createdAt = new Date();
    }

    public Booking(int bookingId, Showtime showtime, User user, Seat seat, double amount, String status, String paymentMethod) {
        this.bookingId = bookingId;
        this.createdAt = new Date();
        this.showtime = showtime;
        this.user = user;
        this.seat = seat;
        this.status = status;
        this.amount = amount;
        this.paymentMethod = paymentMethod;

    }

    public int getBookingId() {
        return bookingId;
    }

    public void setSeat(Seat seat){
        this.seat = seat;
    }

    public Seat getSeat(){
        return seat;
    }

    public void setStatus(String status){
        this.status = status;
    }

    public String getStatus(){
        return status;
    }

    public void setPaymentMethod(String paymentMethod){
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentMethod(){
        return paymentMethod;
    }

    public void setAmount(double amount){
        this.amount = amount;
    }

    public double getAmount(){
        return amount;
    }

    public void setUser(User user){
        this.user = user;
    }

    public User getUser(){
        return user;
    }

    public void setShowtime(Showtime showtime){
        this.showtime = showtime;
    }

    public Showtime getShowtime(){
        return showtime;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
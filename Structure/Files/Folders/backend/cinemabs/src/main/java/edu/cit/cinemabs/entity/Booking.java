package edu.cit.cinemabs.entity;

import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "showtimeId", nullable = false)
    private Showtime showtime;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "seatId", nullable = false)
    private Seat seat;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payments;
    
    public Booking() {
        this.createdAt = new Date();
    }

    public Booking(int bookingId, Showtime showtime, User user, Seat seat) {
        this.bookingId = bookingId;
        this.createdAt = new Date();
        this.showtime = showtime;
        this.user = user;
        this.seat = seat;
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
package edu.cit.cinemabs.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookingId;

    private int movieCinemaId;
    private int userId;
    private int seatId;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public Booking() {
        this.createdAt = new Date(); // Auto-set creation date
    }

    public Booking(int movieCinemaId, int userId, int seatId) {
        this.movieCinemaId = movieCinemaId;
        this.userId = userId;
        this.seatId = seatId;
        this.createdAt = new Date();
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public int getMovieCinemaId() {
        return movieCinemaId;
    }

    public void setMovieCinemaId(int movieCinemaId) {
        this.movieCinemaId = movieCinemaId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
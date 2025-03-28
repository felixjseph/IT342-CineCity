package edu.cit.cinemabs.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class SeatBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seatId", nullable = false)
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "bookingId", nullable = false)
    private Booking booking;

    @OneToMany(mappedBy = "seatBooking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Payment> payment;

    public SeatBooking(){}

    public SeatBooking(long id, Seat seat, Booking booking){
        this.id = id;
        this.seat = seat;
        this.booking = booking;
    }

    public void setId(long id){
        this.id = id;
    }

    public void setSeat(Seat seat){
        this.seat = seat;
    }

    public void setBooking(Booking booking){
        this.booking = booking;
    }

    public Long getId(){
        return id;
    }

    public Seat getSeat(){
        return seat;
    }

    public Booking getBooking(){
        return booking;
    }

}

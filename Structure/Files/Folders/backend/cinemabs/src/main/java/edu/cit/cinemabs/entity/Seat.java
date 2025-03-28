package edu.cit.cinemabs.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seatId")
    private int seatId;

    @Column(name = "seatNo", nullable = false)
    private String seatNo;

    @ManyToOne
    @JoinColumn(name = "cinemaId", nullable = false)
    private Cinema cinema;

    @OneToMany(mappedBy = "seat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SeatBooking> seatBookings;

    public Seat() {}

    public Seat(int seatId, String seatNo, Cinema cinema) {
        this.seatId = seatId;
        this.seatNo = seatNo;
        this.cinema = cinema;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatNo() {
        return seatNo;
    }

    public void setSeatNo(String seatNo) {
        this.seatNo = seatNo;
    }

    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }
}

package edu.cit.cinemabs.entity;

import jakarta.persistence.*;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seatId")
    private int seatId;

    @Column(name = "seatNo", nullable = false)
    private String seatNo;

    @Column(name = "cinemaId", nullable = false)
    private int cinemaId;

    public Seat() {}

    public Seat(int seatId, String seatNo, int cinemaId) {
        this.seatId = seatId;
        this.seatNo = seatNo;
        this.cinemaId = cinemaId;
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

    public int getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(int cinemaId) {
        this.cinemaId = cinemaId;
    }
}

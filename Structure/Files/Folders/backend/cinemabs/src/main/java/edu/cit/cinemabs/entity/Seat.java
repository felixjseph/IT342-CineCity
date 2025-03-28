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
    @JoinColumn(name = "showtimeId", nullable = true)
    private Showtime showtime;

    @OneToMany(mappedBy = "seat",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    private boolean isAvailable;


    public Seat() {}

    public Seat(int seatId, String seatNo, Showtime showtime, boolean isAvailable) {
        this.seatId = seatId;
        this.seatNo = seatNo;
        this.showtime = showtime;
        this.isAvailable = isAvailable;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setShowtime(Showtime showtime){
        this.showtime = showtime;
    }

    public void setIsAvaiable(boolean isAvailable){
        this.isAvailable = isAvailable;
    }

    public Showtime getShowtime(){
        return showtime;
    }

    public boolean getIsAvailable(){
        return isAvailable;
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
}

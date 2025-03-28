package edu.cit.cinemabs.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "cinema")
public class Cinema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cinemaId;

    private String cinema_name;

    @OneToMany(mappedBy = "cinema", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Showtime> movieCinemas;

    @OneToMany(mappedBy = "cinema", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Seat> seats;

    public Cinema() {}

    public Cinema(int cinemaId, String cinema_name) {
        this.cinemaId = cinemaId;
        this.cinema_name = cinema_name;
    }

    public int getCinema_ID() {
        return cinemaId;
    }

    public void setCinema_ID(int cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getCinema_name() {
        return cinema_name;
    }

    public void setCinema_name(String cinema_name) {
        this.cinema_name = cinema_name;
    }

    public List<Showtime> getMovieCinemas() {
        return movieCinemas;
    }

    public void setMovieCinemas(List<Showtime> movieCinemas) {
        this.movieCinemas = movieCinemas;
    }

    // Business method
    public String getCinemaDetails() {
        return "Cinema ID: " + cinemaId + ", Name: " + cinema_name;
    }
}

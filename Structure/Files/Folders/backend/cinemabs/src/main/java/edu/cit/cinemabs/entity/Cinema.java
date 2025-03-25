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
    private int cinema_ID;

    private String cinema_name;

    @OneToMany(mappedBy = "cinema", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MovieCinema> movieCinemas; // Plural for clarity

    // Constructors
    public Cinema() {}

    public Cinema(int cinema_ID, String cinema_name) {
        this.cinema_ID = cinema_ID;
        this.cinema_name = cinema_name;
    }

    // Getters and Setters
    public int getCinema_ID() {
        return cinema_ID;
    }

    public void setCinema_ID(int cinema_ID) {
        this.cinema_ID = cinema_ID;
    }

    public String getCinema_name() {
        return cinema_name;
    }

    public void setCinema_name(String cinema_name) {
        this.cinema_name = cinema_name;
    }

    public List<MovieCinema> getMovieCinemas() {
        return movieCinemas;
    }

    public void setMovieCinemas(List<MovieCinema> movieCinemas) {
        this.movieCinemas = movieCinemas;
    }

    // Business method
    public String getCinemaDetails() {
        return "Cinema ID: " + cinema_ID + ", Name: " + cinema_name;
    }
}

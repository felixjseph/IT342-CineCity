package edu.cit.cinemabs.entity;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "showtime")
public class Showtime{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int showtimeId;

    private Date date;
    private Time time;


    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "cinema_id",nullable = false)
    private Cinema cinema;

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Seat> seats;

    @Column(nullable = false)
    private float price;

    public Showtime(){}

    public Showtime(int showtimeId, Cinema cinema, Movie movie,Time time, Date date, float price){
        this.showtimeId = showtimeId;
        this.cinema = cinema;
        this.movie = movie;
        this.date = date;
        this.time = time;
        this.price = price;
    }

    public void setMovieCinemaId(int showtimeId){
        this.showtimeId = showtimeId;
    }

    public int getMovieCinemaId(){
        return showtimeId;
    }

    public void setMovie(Movie movie){
        this.movie = movie;
    }

    public Movie getMovie(){
        return movie;
    }

    public void setCinema(Cinema cinema){
        this.cinema = cinema;
    }

    public Cinema getCinema(){
        return cinema;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getTime() {
        return time;
    }

    public void setTime(Time time) {
        this.time = time;
    }

    public void setPrice(float price){
        this.price = price;
    }

    public float getPrice(){
        return price;
    }

}

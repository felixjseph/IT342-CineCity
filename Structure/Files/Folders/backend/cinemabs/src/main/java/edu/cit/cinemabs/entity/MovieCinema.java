package edu.cit.cinemabs.entity;

import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "movie_cinema")
public class MovieCinema{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movie_cinema_id;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "cinema_id",nullable = false)
    private Cinema cinema;


    public MovieCinema(){}

    public MovieCinema(int movie_cinema_id, Cinema cinema, Movie movie){
        this.movie_cinema_id = movie_cinema_id;
        this.cinema = cinema;
        this.movie = movie;
    }

    public void setMovieCinemaId(int movie_cinema_id){
        this.movie_cinema_id = movie_cinema_id;
    }

    public int getMovieCinemaId(){
        return movie_cinema_id;
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

}

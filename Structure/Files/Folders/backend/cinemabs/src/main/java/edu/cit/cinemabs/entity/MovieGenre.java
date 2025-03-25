package edu.cit.cinemabs.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MovieGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int movieGenreId;

    private int movieId;
    private int genreId;

    public MovieGenre() {}

    public MovieGenre(int movieId, int genreId) {
        this.movieId = movieId;
        this.genreId = genreId;
    }

    public int getMovieGenreId() {
        return movieGenreId;
    }

    public void setMovieGenreId(int movieGenreId) {
        this.movieGenreId = movieGenreId;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getGenreId() {
        return genreId;
    }

    public void setGenreId(int genreId) {
        this.genreId = genreId;
    }
}

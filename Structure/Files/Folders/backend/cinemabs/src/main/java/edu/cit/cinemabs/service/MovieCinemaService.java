package edu.cit.cinemabs.service;

import java.util.List;

import edu.cit.cinemabs.entity.MovieCinema;
import edu.cit.cinemabs.repository.MovieCinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MovieCinemaService{

    @Autowired
    MovieCinemaRepository mcrepo;

    public MovieCinemaService(){}

    public MovieCinema postMovieCinema(MovieCinema movie_cinema){
        return mcrepo.save(movie_cinema);
    }

    public List<MovieCinema> getAllMovieCinema(){
        return mcrepo.findAll();
    }

    public MovieCinema updateMovieCinema(MovieCinema updatedMovieCinema, int movie_cinema_id){
        MovieCinema existingMovieCinema = mcrepo.findById(movie_cinema_id).orElseThrow(()-> new IllegalArgumentException("MovieCinema id not found"));
        existingMovieCinema.setCinema(updatedMovieCinema.getCinema());
        existingMovieCinema.setMovie(updatedMovieCinema.getMovie());
        return mcrepo.save(existingMovieCinema);
    }

    public void deleteMovieCineme(int movie_cinema_id){
        MovieCinema movieCinema = mcrepo.findById(movie_cinema_id).orElseThrow(()-> new IllegalArgumentException("MovieCinema id not found"));
        mcrepo.delete(movieCinema);
    }


    public MovieCinema getShowtimeById(int movie_cinema_id){
        return mcrepo.findById(movie_cinema_id).orElseThrow(()-> new IllegalArgumentException("Showtime was not found"));
    }

}
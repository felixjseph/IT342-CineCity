package edu.cit.cinemabs.service;

import java.util.List;

import edu.cit.cinemabs.entity.Showtime;
import edu.cit.cinemabs.repository.MovieCinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MovieCinemaService{

    @Autowired
    MovieCinemaRepository mcrepo;

    public MovieCinemaService(){}

    public Showtime postMovieCinema(Showtime movie_cinema){
        return mcrepo.save(movie_cinema);
    }

    public List<Showtime> getAllMovieCinema(){
        return mcrepo.findAll();
    }

    public Showtime updateMovieCinema(Showtime updatedMovieCinema, int movie_cinema_id) {
        Showtime existingMovieCinema = mcrepo.findById(movie_cinema_id)
            .orElseThrow(() -> new IllegalArgumentException("MovieCinema id not found"));
        existingMovieCinema.setCinema(updatedMovieCinema.getCinema());
        existingMovieCinema.setMovie(updatedMovieCinema.getMovie());
        existingMovieCinema.setDate(updatedMovieCinema.getDate()); // Update date
        existingMovieCinema.setTime(updatedMovieCinema.getTime()); // Update time
        return mcrepo.save(existingMovieCinema);
    }

    public void deleteMovieCineme(int movie_cinema_id){
        Showtime movieCinema = mcrepo.findById(movie_cinema_id).orElseThrow(()-> new IllegalArgumentException("MovieCinema id not found"));
        mcrepo.delete(movieCinema);
    }


    public Showtime getShowtimeById(int movie_cinema_id){
        return mcrepo.findById(movie_cinema_id).orElseThrow(()-> new IllegalArgumentException("Showtime was not found"));
    }

}
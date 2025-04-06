package edu.cit.cinemabs.service;

import java.util.List;

import edu.cit.cinemabs.entity.Showtime;
import edu.cit.cinemabs.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class MovieCinemaService {

    @Autowired
    ShowtimeRepository mcrepo;

    public MovieCinemaService() {
    }

    // @CacheEvict(value = "showtimes",allEntries = true)
    public Showtime postMovieCinema(Showtime movie_cinema) {
        return mcrepo.save(movie_cinema);
    }

    // @Cacheable(value = "showtimes")
    public List<Showtime> getAllMovieCinema() {
        return mcrepo.findAll();
    }

    // @CacheEvict(value = "showtimes", key = "#movie_cinema_id")
    public Showtime updateMovieCinema(Showtime updatedMovieCinema, int movie_cinema_id) {
        Showtime existingMovieCinema = mcrepo.findById(movie_cinema_id)
                .orElseThrow(() -> new IllegalArgumentException("MovieCinema id not found"));
        existingMovieCinema.setCinema(updatedMovieCinema.getCinema());
        existingMovieCinema.setMovie(updatedMovieCinema.getMovie());
        existingMovieCinema.setDate(updatedMovieCinema.getDate()); // Update date
        existingMovieCinema.setTime(updatedMovieCinema.getTime()); // Update time
        existingMovieCinema.setPrice(updatedMovieCinema.getPrice());
        return mcrepo.save(existingMovieCinema);
    }

    // @CacheEvict(value = "showtimes", key = "#movie_cinema_id")
    public void deleteMovieCineme(int movie_cinema_id) {
        Showtime movieCinema = mcrepo.findById(movie_cinema_id)
                .orElseThrow(() -> new IllegalArgumentException("MovieCinema id not found"));
        mcrepo.delete(movieCinema);
    }

    // @Cacheable(value = "showtimeById", key = "#movie_cinema_id")
    public Showtime getShowtimeById(int movie_cinema_id) {
        return mcrepo.findById(movie_cinema_id)
                .orElseThrow(() -> new IllegalArgumentException("Showtime was not found"));
    }

    // @Cacheable(value = "showtimeByMovieId", key = "#id")
    public List<Showtime> getShowtimeByMovieId(int id) {
        return mcrepo.findShowtimeByMovieId(id);
    }

    public long getTotalShowtimes() {
        return mcrepo.count();
    }

}
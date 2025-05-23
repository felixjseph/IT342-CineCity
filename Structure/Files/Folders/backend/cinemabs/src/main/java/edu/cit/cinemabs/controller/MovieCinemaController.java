package edu.cit.cinemabs.controller;

import java.util.List;

import edu.cit.cinemabs.entity.Showtime;
import edu.cit.cinemabs.service.MovieCinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/showtime")
public class MovieCinemaController {
    @Autowired
    MovieCinemaService mcserv;

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Showtime> getAllMovieCinema(){
        return mcserv.getAllMovieCinema();
    }

    @PostMapping
    public Showtime postMovieCinema(@RequestBody Showtime movieCinema){
        return mcserv.postMovieCinema(movieCinema);
    }

    @PutMapping("/{movie_cinema_id}")
    public Showtime updatMovieCinema(@RequestBody Showtime movieCinema, @PathVariable int movie_cinema_id){
        return mcserv.updateMovieCinema(movieCinema, movie_cinema_id);
    }

    @DeleteMapping("/{movie_cinema_id}")
    public void deleteMovieCinema(@PathVariable int movie_cinema_id){
        mcserv.deleteMovieCineme(movie_cinema_id);
    }

    @GetMapping("/{movie_cinema_id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Showtime getShowtime(@PathVariable int movie_cinema_id){
        return mcserv.getShowtimeById(movie_cinema_id);
    }

    @GetMapping("/movie/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Showtime> getShowtimeByMovieId(@PathVariable int id){
        return mcserv.getShowtimeByMovieId(id);
    }

    @GetMapping("/stats/count")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public long getTotalShowtimes() {
        return mcserv.getTotalShowtimes();
    }
}

package edu.cit.cinemabs.controller;

import java.util.List;

import edu.cit.cinemabs.entity.MovieCinema;
import edu.cit.cinemabs.service.MovieCinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/moviecinema")
public class MovieCinemaController {
    @Autowired
    MovieCinemaService mcserv;

    @GetMapping("/getAllMovieCinema")
    public List<MovieCinema> getAllMovieCinema(){
        return mcserv.getAllMovieCinema();
    }

    @PostMapping("/postMovieCinema")
    public MovieCinema postMovieCinema(@RequestBody MovieCinema movieCinema){
        return mcserv.postMovieCinema(movieCinema);
    }

    @PutMapping("/updateMovieCinema/{movie_cinema_id}")
    public MovieCinema updatMovieCinema(@RequestBody MovieCinema movieCinema, @PathVariable int movie_cinema_id){
        return mcserv.updateMovieCinema(movieCinema, movie_cinema_id);
    }

    @DeleteMapping("/deleteMovieCinema/{movie_cinema_id}")
    public void deleteMovieCinema(@PathVariable int movie_cinema_id){
        mcserv.deleteMovieCineme(movie_cinema_id);
    }

    @GetMapping("/getmoviecinema/{movie_cinema_id}")
    public MovieCinema getShowtime(@PathVariable int movie_cinema_id){
        return mcserv.getShowtimeById(movie_cinema_id);
    }
}

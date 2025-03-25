package edu.cit.cinemabs.controller;

import edu.cit.cinemabs.entity.MovieGenre;
import edu.cit.cinemabs.service.MovieGenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movie-genres")
public class MovieGenreController {

    @Autowired
    private MovieGenreService movieGenreService;

    @PostMapping
    public MovieGenre addMovieGenre(@RequestBody MovieGenre movieGenre) {
        return movieGenreService.addMovieGenre(movieGenre);
    }

    @GetMapping
    public List<MovieGenre> getAllMovieGenres() {
        return movieGenreService.getAllMovieGenres();
    }

    @GetMapping("/{id}")
    public Optional<MovieGenre> getMovieGenreById(@PathVariable int id) {
        return movieGenreService.getMovieGenreById(id);
    }

    @PutMapping("/{id}")
    public MovieGenre updateMovieGenre(@PathVariable int id, @RequestBody MovieGenre movieGenre) {
        return movieGenreService.updateMovieGenre(id, movieGenre);
    }

    @DeleteMapping("/{id}")
    public void deleteMovieGenre(@PathVariable int id) {
        movieGenreService.deleteMovieGenre(id);
    }
}

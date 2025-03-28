package edu.cit.cinemabs.controller;

import java.io.IOException;
import java.util.List;

import edu.cit.cinemabs.entity.Movie;
import edu.cit.cinemabs.service.GenreService;
import edu.cit.cinemabs.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Autowired
    MovieService mserv;

    @Autowired
    GenreService genreService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return mserv.getAllMovie();
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie) {
        return mserv.postMovieDetails(movie);
    }

    @PutMapping("/{id}")
    public Movie updateMovie(@PathVariable int id, @RequestBody Movie movie){
        return mserv.updateMovieDetails(movie, id);
    }

    @DeleteMapping("/{id}")
    public void deleteMovie(@PathVariable int id) {
        mserv.deleteMovie(id);
    }

    @GetMapping("/{id}")
    public Movie getMovieDetail(@PathVariable int id){
        return mserv.getMovieDetail(id);
    }

    // Set Cover Photo
    @PutMapping(value = "/{id}/cover", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Movie setCoverPhoto(@PathVariable int id, @RequestParam("photo") MultipartFile photo) throws IOException {
        byte[] photoBytes = photo.getBytes();
        return mserv.setCoverPhoto(id, photoBytes);
    }

    // Get Cover Photo
    @GetMapping(value = "/{id}/cover", produces = MediaType.IMAGE_JPEG_VALUE)
    public byte[] getCoverPhoto(@PathVariable int id) {
        return mserv.getCoverPhoto(id);
    }
}
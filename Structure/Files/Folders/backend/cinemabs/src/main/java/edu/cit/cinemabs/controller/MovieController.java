package edu.cit.cinemabs.controller;

import java.io.IOException;
import java.util.List;
import java.util.Objects;


import edu.cit.cinemabs.entity.Genre;
import edu.cit.cinemabs.entity.Movie;
import edu.cit.cinemabs.service.GenreService;
import edu.cit.cinemabs.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/movie")
public class MovieController {

    @Autowired
    MovieService mserv;

    @Autowired
    GenreService genreService;

    @GetMapping("/getMovieDetails")
    public List<Movie> getAllMovies() {
        return mserv.getAllMovie();
    }


    @PostMapping(value = "/postMovieDetails", consumes = {"multipart/form-data"})
    public ResponseEntity<Movie> postMovieDetails(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("title") String title,
            @RequestParam("duration") int duration,
            @RequestParam("synopsis") String synopsis,
            @RequestParam("genreId") int genreId) {
        try {
            byte[] photoBytes = null;

            // Validate and process the photo
            if (photo != null) {
                String contentType = photo.getContentType();
                if (contentType == null || (!contentType.startsWith("image/") &&
                        !photo.getOriginalFilename().matches(".*\\.(jpg|jpeg|png|svg)$"))) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body(null);
                }
                photoBytes = photo.getBytes();
            }

            // Create a new Movie object
            Movie movie = new Movie();
            movie.setPhoto(photoBytes); // Set photo (or null if not provided)
            movie.setTitle(title);
            movie.setDuration(duration);
            movie.setSynopsis(synopsis);

            // Fetch the Genre object
            Genre genre = genreService.getGenreById(genreId); // Implement this
            if (genre == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            movie.setGenre(genre);

            // Save the Movie object
            Movie savedMovie = mserv.postMovieDetails(movie);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedMovie);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @PutMapping(value = "/updateMovieDetails/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Movie> updateMovieDetails(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("title") String title,
            @RequestParam("duration") int duration,
            @RequestParam("synopsis") String synopsis,
            @RequestParam("genreId") int genreId,
            @PathVariable int id) {
        try {
            // Fetch the existing movie record
            Movie existingMovie = mserv.getMovieDetail(id); // Implement findById in your MovieService
            if (existingMovie == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Process and validate the photo if provided
            if (photo != null) {
                String contentType = photo.getContentType();
                if (contentType == null || (!contentType.startsWith("image/") &&
                        !photo.getOriginalFilename().matches(".*\\.(jpg|jpeg|png|gif)$"))) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body(null);
                }
                existingMovie.setPhoto(photo.getBytes());
            }

            // Update other movie details
            existingMovie.setTitle(title);
            existingMovie.setDuration(duration);
            existingMovie.setSynopsis(synopsis);

            // Fetch and set the Genre object
            Genre genre = genreService.getGenreById(genreId); // Implement this in your GenreService
            if (genre == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            existingMovie.setGenre(genre);

            // Save updated movie
            Movie updatedMovie = mserv.updateMovieDetails(existingMovie, id);

            return ResponseEntity.status(HttpStatus.OK).body(updatedMovie);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @DeleteMapping("/deleteMovie/{id}")
    public void deleteMovie(@PathVariable int id) {
        mserv.deleteMovie(id);
    }

    @GetMapping("/getmovie/{id}")
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

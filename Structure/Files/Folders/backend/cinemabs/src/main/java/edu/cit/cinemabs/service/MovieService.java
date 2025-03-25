package edu.cit.cinemabs.service;

import java.util.List;


import edu.cit.cinemabs.entity.Movie;
import edu.cit.cinemabs.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {
    @Autowired
    MovieRepo mrepo;

    public MovieService(){
        super();
    }

    //CREATE
    public Movie postMovieDetails(Movie movie){
        return mrepo.save(movie);
    }

    //READ
    public List<Movie> getAllMovie(){
        return mrepo.findAll();
    }

    //UPDATE
    public Movie updateMovieDetails(Movie updatedMovie, int id){
        Movie existingMovie = mrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Movie with ID "+id+" not found"));
        existingMovie.setTitle(updatedMovie.getTitle());
        existingMovie.setDuration(updatedMovie.getDuration());
        existingMovie.setSynopsis(updatedMovie.getSynopsis());
        existingMovie.setGenre(updatedMovie.getGenre());
        return mrepo.save(existingMovie);
    }

    //DELETE
    public void deleteMovie(int id){
        Movie movie = mrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Cannot find movie"));
        mrepo.delete(movie);
    }

    public Movie getMovieDetail(int id){
        return mrepo.findById(id).orElseThrow(()-> new IllegalArgumentException("Movie not found"));
    }

    public Movie setCoverPhoto(int id, byte[] photoBytes) {
        Movie movie = mrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Cannot find movie"));
        movie.setPhoto(photoBytes);
        return movie;
    }

    public byte[] getCoverPhoto(int id) {
        Movie movie = mrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Cannot find movie"));
        return movie.getPhoto();
    }
}
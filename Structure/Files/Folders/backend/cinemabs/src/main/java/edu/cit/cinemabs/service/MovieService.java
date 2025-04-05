package edu.cit.cinemabs.service;

import java.util.List;

import edu.cit.cinemabs.entity.Movie;
import edu.cit.cinemabs.repository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class MovieService {
    @Autowired
    MovieRepo mrepo;

    public MovieService(){
        super();
    }

    //CREATE
    //@CacheEvict(value = "movies", allEntries = true)
    public Movie postMovieDetails(Movie movie){
        return mrepo.save(movie);
    }

    //READ
    //@Cacheable(value = "movies")
    public List<Movie> getAllMovie(){
        return mrepo.findAll();
    }

    //UPDATE
    //@CacheEvict(value = "movies", key = "#id")
    public Movie updateMovieDetails(Movie updatedMovie, int id){
        Movie existingMovie = mrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Movie with ID "+id+" not found"));
        existingMovie.setTitle(updatedMovie.getTitle());
        existingMovie.setDuration(updatedMovie.getDuration());
        existingMovie.setSynopsis(updatedMovie.getSynopsis());
        existingMovie.setGenre(updatedMovie.getGenre());
        return mrepo.save(existingMovie);
    }

    //DELETE
    //@CacheEvict(value = "movies", key = "#id")
    public void deleteMovie(int id){
        Movie movie = mrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Cannot find movie"));
        mrepo.delete(movie);
    }

    //@Cacheable(value = "movieDetail", key = "#id")
    public Movie getMovieDetail(int id){
        return mrepo.findById(id).orElseThrow(()-> new IllegalArgumentException("Movie not found"));
    }

    //@CacheEvict(value = "movies", key = "#id")
    public Movie setCoverPhoto(int id, byte[] photoBytes) {
        Movie movie = mrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Cannot find movie"));
        movie.setPhoto(photoBytes);
        return mrepo.save(movie);
    }

    //@Cacheable(value = "moviePhoto", key = "#id")
    public byte[] getCoverPhoto(int id) {
        Movie movie = mrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Cannot find movie"));
        return movie.getPhoto();
    }

    public long getTotalMovies() {
        return mrepo.count();
    }
}
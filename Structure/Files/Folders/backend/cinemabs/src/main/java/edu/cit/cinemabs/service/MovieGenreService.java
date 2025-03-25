package edu.cit.cinemabs.service;

import edu.cit.cinemabs.entity.MovieGenre;
import edu.cit.cinemabs.repository.MovieGenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieGenreService {

    @Autowired
    private MovieGenreRepository movieGenreRepository;

    public MovieGenre addMovieGenre(MovieGenre movieGenre) {
        return movieGenreRepository.save(movieGenre);
    }

    public List<MovieGenre> getAllMovieGenres() {
        return movieGenreRepository.findAll();
    }

    public Optional<MovieGenre> getMovieGenreById(int id) {
        return movieGenreRepository.findById(id);
    }

    public MovieGenre updateMovieGenre(int id, MovieGenre newMovieGenre) {
        if (movieGenreRepository.existsById(id)) {
            newMovieGenre.setMovieGenreId(id);
            return movieGenreRepository.save(newMovieGenre);
        }
        return null;
    }

    public void deleteMovieGenre(int id) {
        movieGenreRepository.deleteById(id);
    }
}

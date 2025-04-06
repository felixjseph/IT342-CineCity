package edu.cit.cinemabs.service;

import java.util.List;

import edu.cit.cinemabs.entity.Genre;
import edu.cit.cinemabs.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;



@Service
public class GenreService {
    @Autowired
    GenreRepository grepo;

    public GenreService(){
        super();
    }

    //@Cacheable(value = "genresByName", key = "#name")
    public List<Genre> searchGenresByName(String name) {
        return grepo.searchGenresByName(name);
    }

     //@CacheEvict(value = "genres", allEntries = true)
    public Genre addNewGenre(Genre genre){
        return grepo.save(genre);
    }

    //@Cacheable(value = "genres")
    public List<Genre> getAllGenre(){
        return grepo.findAll();
    }

    //@CacheEvict(value = "genres", key = "#id")
    public Genre updateGenre(Genre updatedGenre, int id){
        Genre exisingGenre = grepo.findById(id).orElseThrow(()-> new IllegalArgumentException("Genre id not found."));
        exisingGenre.setGenreName(updatedGenre.getGenreName());
        return grepo.save(exisingGenre);
    }

    //@CacheEvict(value = "genres", key = "#id")
    public void deleteGenre(int id){
        Genre existingGenre = grepo.findById(id).orElseThrow(()-> new IllegalArgumentException("Genre id not found"));
        grepo.delete(existingGenre);
    }

    //@Cacheable(value = "genre", key = "#id")
    public Genre getGenreById(int genreId) {
        return grepo.findById(genreId)
                .orElseThrow(() -> new IllegalArgumentException("Genre with ID " + genreId + " not found"));
    }

    public long getTotalGenres() {
        return grepo.count();
    }


}

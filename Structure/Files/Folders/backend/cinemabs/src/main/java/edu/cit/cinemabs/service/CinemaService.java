package edu.cit.cinemabs.service;


import edu.cit.cinemabs.entity.Cinema;
import edu.cit.cinemabs.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CinemaService {

    @Autowired
    private CinemaRepository cinemaRepository;

    // Get all cinemas
    //@Cacheable(value = "cinemas")
    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }

    // Get cinema by ID
    //@Cacheable(value = "cinema", key = "#id")
    public Cinema getCinemaById(int id) {
        return cinemaRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Cinema id not found"));
    }

    // Create new cinema
    // @CacheEvict(value = "cinemas", allEntries = true)
    public Cinema createCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    // Update cinema
    //@CacheEvict(value = "cinemas", key = "#updatedCinema.cinema_ID")
    public Cinema updateCinema(int id, Cinema updatedCinema) {
        Cinema existingCinema = cinemaRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Cinema id was not found"));
        existingCinema.setCinema_name(updatedCinema.getCinema_name());
        return cinemaRepository.save(existingCinema);
    }

    // Delete cinema
    //@CacheEvict(value = "cinemas", key = "#id")
    public void deleteCinema(int id) {
        Cinema cinema = cinemaRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Cinema id was not found"));
        cinemaRepository.delete(cinema);
    }

    public long getTotalCinemas() {
        return cinemaRepository.count();
    }
}
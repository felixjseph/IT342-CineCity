package edu.cit.cinemabs.service;


import edu.cit.cinemabs.entity.Cinema;
import edu.cit.cinemabs.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CinemaService {

    @Autowired
    private CinemaRepository cinemaRepository;

    // Get all cinemas
    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }

    // Get cinema by ID
    public Cinema getCinemaById(int id) {
        return cinemaRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Cinema id not found"));
    }

    // Create new cinema
    public Cinema createCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    // Update cinema
    public Cinema updateCinema(int id, Cinema updatedCinema) {
        Cinema existingCinema = cinemaRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Cinema id was not found"));
        existingCinema.setCinema_name(updatedCinema.getCinema_name());
        return cinemaRepository.save(existingCinema);
    }

    // Delete cinema
    public void deleteCinema(int id) {
        Cinema cinema = cinemaRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("Cinema id was not found"));
        cinemaRepository.delete(cinema);
    }
}
package edu.cit.cinemabs.controller;


import edu.cit.cinemabs.entity.Cinema;
import edu.cit.cinemabs.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cinemas")
public class CinemaController {

    @Autowired
    private CinemaService cserv;

    @GetMapping("/all")
    public List<Cinema> getAllCinemas() {
        return cserv.getAllCinemas();
    }

    @GetMapping("/{id}")
    public Cinema getCinemaById(@PathVariable int id) {
        return cserv.getCinemaById(id);
    }

    // Create new cinema
    @PostMapping("/")
    public Cinema createCinema(@RequestBody Cinema cinema) {
        return cserv.createCinema(cinema);
    }

    // Update cinema
    @PutMapping("/{id}")
    public Cinema updateCinema(@PathVariable int id, @RequestBody Cinema updatedCinema) {
        return cserv.updateCinema(id, updatedCinema);
    }

    // Delete cinema
    @DeleteMapping("/{id}")
    public void deleteCinema(@PathVariable int id) {
        cserv.deleteCinema(id);
    }
}

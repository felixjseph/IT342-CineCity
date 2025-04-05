package edu.cit.cinemabs.controller;

import edu.cit.cinemabs.entity.Cinema;
import edu.cit.cinemabs.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cinemas")
public class CinemaController {

    @Autowired
    private CinemaService cserv;

    @GetMapping
    public List<Cinema> getAllCinemas() {
        return cserv.getAllCinemas();
    }

    @GetMapping("/{id}")
    public Cinema getCinemaById(@PathVariable int id) {
        return cserv.getCinemaById(id);
    }

    @PostMapping
    public Cinema createCinema(@RequestBody Cinema cinema) {
        return cserv.createCinema(cinema);
    }

    @PutMapping("/{id}")
    public Cinema updateCinema(@PathVariable int id, @RequestBody Cinema updatedCinema) {
        return cserv.updateCinema(id, updatedCinema);
    }

    @DeleteMapping("/{id}")
    public void deleteCinema(@PathVariable int id) {
        cserv.deleteCinema(id);
    }

    @GetMapping("/stats/count")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public long getTotalCinemas() {
        return cserv.getTotalCinemas();
    }
}

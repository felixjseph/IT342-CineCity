package edu.cit.cinemabs.controller;

import edu.cit.cinemabs.entity.Seat;
import edu.cit.cinemabs.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seats")
public class SeatController {
    @Autowired
    SeatService seatService;

    @PostMapping
    public Seat createSeat(@RequestBody Seat seat) {
        return seatService.addNewSeat(seat);
    }

    @PostMapping("/default-seats/{showtimeId}")
    public void insertDefaultSeats(@PathVariable int showtimeId) {
        seatService.insertDefaultSeats(showtimeId);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public Seat getSeatById(@PathVariable int id) {
        return seatService.getSeatById(id);
    }


    @PutMapping("/{id}")
    public Seat updateSeat(@RequestBody Seat seat, @PathVariable int id) {
        return seatService.updateSeat(seat, id);
    }

    @DeleteMapping("/{id}")
    public void deleteSeat(@PathVariable int id) {
        seatService.deleteSeat(id);
    }

    @GetMapping("/showtime/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<Seat> getSeatsByShowtimeId(@PathVariable int id){
        return seatService.getSeatsByShowtimeId(id);
    }

}


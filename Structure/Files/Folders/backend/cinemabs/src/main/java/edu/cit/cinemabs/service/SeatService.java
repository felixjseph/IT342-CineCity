package edu.cit.cinemabs.service;

import edu.cit.cinemabs.entity.Seat;
import edu.cit.cinemabs.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    // Create a new seat
    public Seat addNewSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    // Get all seats
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    // Get a seat by ID
    public Seat getSeatById(int id) {
        return seatRepository.findById(id).orElse(null);
    }

    // Update seat
    public Seat updateSeat(Seat updatedSeat, int id) {
        Optional<Seat> existingSeat = seatRepository.findById(id);
        if (existingSeat.isPresent()) {
            Seat seat = existingSeat.get();
            seat.setSeatNo(updatedSeat.getSeatNo());
            seat.setCinema(updatedSeat.getCinema());
            return seatRepository.save(seat);
        }
        return null;
    }

    // Delete seat
    public void deleteSeat(int id) {
        seatRepository.deleteById(id);
    }
}

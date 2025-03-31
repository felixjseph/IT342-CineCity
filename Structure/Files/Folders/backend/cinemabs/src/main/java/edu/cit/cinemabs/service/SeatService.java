package edu.cit.cinemabs.service;

import edu.cit.cinemabs.entity.Seat;
import edu.cit.cinemabs.entity.Showtime;
import edu.cit.cinemabs.repository.SeatRepository;
import edu.cit.cinemabs.repository.ShowtimeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

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
            seat.setShowtime(updatedSeat.getShowtime());
            seat.setIsAvaiable(updatedSeat.getIsAvailable());
            return seatRepository.save(seat);
        }
        return null;
    }

    
    public void deleteSeat(int id) {
        seatRepository.deleteById(id);
    }

    @Autowired
    private ShowtimeRepository showtimeRepository; // Assuming you have a repository for Showtime

    // Method to insert default seats with a specific showtime
    public void insertDefaultSeats(int showtimeId) {
        // Fetch the showtime by ID
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new IllegalArgumentException("Showtime with id " + showtimeId + " not found"));

        char[] rows = "ABCDEFG".toCharArray();
        IntStream.rangeClosed(1, 10).forEach(seatNo -> {
            for (char row : rows) {
                Seat seat = new Seat();
                seat.setSeatNo(row + String.valueOf(seatNo));
                seat.setIsAvaiable(false); // Set isAvailable to false
                seat.setShowtime(showtime); // Associate the seat with the showtime
                seatRepository.save(seat);
            }
        });
    }

    public List<Seat> getSeatsByShowtimeId(int id){
        return seatRepository.findByShowtime_ShowtimeId(id);
    }
}

package edu.cit.cinemabs.service;

import edu.cit.cinemabs.entity.Seat;
import edu.cit.cinemabs.entity.Showtime;
import edu.cit.cinemabs.repository.SeatRepository;
import edu.cit.cinemabs.repository.ShowtimeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    // Create a new seat
    //@CacheEvict(value = "seats", allEntries = true)
    public Seat addNewSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    // Get all seats
    //@Cacheable(value = "seats")
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    //@Cacheable(value = "seatsById", key = "#id")
    public Seat getSeatById(int id) {
        return seatRepository.findById(id).orElse(null);
    }

    // Update seat
    //@CacheEvict(value = "seats", key = "#id")
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

    public Seat updateSeatAvailability(int id){
        Optional<Seat> existingSeat = seatRepository.findById(id);
        if (existingSeat.isPresent()) {
            Seat sit = existingSeat.get();
            sit.setIsAvaiable(false);
            return seatRepository.save(sit);
        }
        return null;
    }

    //@CacheEvict(value = "seats", key = "#id")
    public void deleteSeat(int id) {
        seatRepository.deleteById(id);
    }

    @Autowired
    private ShowtimeRepository showtimeRepository;

    public void insertDefaultSeats(int showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new IllegalArgumentException("Showtime with id " + showtimeId + " not found"));

        char[] rows = "ABCDEFG".toCharArray();
        IntStream.rangeClosed(1, 10).forEach(seatNo -> {
            for (char row : rows) {
                Seat seat = new Seat();
                seat.setSeatNo(row + String.valueOf(seatNo));
                seat.setIsAvaiable(true);
                seat.setShowtime(showtime);
                seatRepository.save(seat);
            }
        });
    }

    //@Cacheable(value = "seatsByShowtimeId", key = "#id")
    public List<Seat> getSeatsByShowtimeId(int id){
        return seatRepository.findByShowtime_ShowtimeId(id);
    }
}

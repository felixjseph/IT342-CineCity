package edu.cit.cinemabs.service;

import edu.cit.cinemabs.entity.Booking;
import edu.cit.cinemabs.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(int id) {
        return bookingRepository.findById(id);
    }

    public Booking updateBooking(int id, Booking newBooking) {
        return bookingRepository.findById(id).map(existingBooking -> {
            existingBooking.setUser(newBooking.getUser());
            existingBooking.setShowtime(newBooking.getShowtime());
            existingBooking.setSeat(newBooking.getSeat());
            return bookingRepository.save(existingBooking);
        }).orElseThrow(() -> new IllegalArgumentException("Booking with id " + id + " not found"));
    }

    public void deleteBooking(int id) {
        bookingRepository.deleteById(id);
    }
}

package edu.cit.cinemabs.service;

import edu.cit.cinemabs.entity.Booking;
import edu.cit.cinemabs.entity.User;
import edu.cit.cinemabs.repository.BookingRepository;
import edu.cit.cinemabs.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    public List<Booking> getBookingsByLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
    
        // Assuming User entity has a username field
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return bookingRepository.findByUser(user);
    }

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    //@Cacheable(value = "bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    //@Cacheable(value = "bookings", key = "#id")
    public Optional<Booking> getBookingById(int id) {
        return bookingRepository.findById(id);
    }

     //@CacheEvict(value = "bookings", key = "#id")
    public Booking updateBooking(int id, Booking newBooking) {
        return bookingRepository.findById(id).map(existingBooking -> {
            existingBooking.setUser(newBooking.getUser());
            existingBooking.setShowtime(newBooking.getShowtime());
            existingBooking.setSeat(newBooking.getSeat());
            return bookingRepository.save(existingBooking);
        }).orElseThrow(() -> new IllegalArgumentException("Booking with id " + id + " not found"));
    }

    @CacheEvict(value = "bookings", key = "#id")
    public void deleteBooking(int id) {
        bookingRepository.deleteById(id);
    }
}

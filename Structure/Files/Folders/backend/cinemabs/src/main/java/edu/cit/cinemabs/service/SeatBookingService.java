package edu.cit.cinemabs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.cit.cinemabs.entity.SeatBooking;
import edu.cit.cinemabs.repository.SeatBookingRepository;

@Service
public class SeatBookingService {
    @Autowired
    SeatBookingRepository sbrepo;

    public List<SeatBooking> getAllSeatBookings(){
        return sbrepo.findAll();
    }

    public SeatBooking getSeatBookingDetail(Long id){
        return sbrepo.findById(id).orElseThrow(()-> new IllegalArgumentException("Seat booking not found"));
    }

    public SeatBooking addSeatBooking(SeatBooking seatBooking){
        return sbrepo.save(seatBooking);
    }

    public SeatBooking updateSeatBooking(Long id, SeatBooking seatBooking){
        SeatBooking existSeatBooking = sbrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Seat Booking with ID "+id+" not found"));
        existSeatBooking.setBooking(seatBooking.getBooking());
        existSeatBooking.setSeat(seatBooking.getSeat());
        return sbrepo.save(existSeatBooking);
    }

    public void deleteSeatBooking(Long id){
        SeatBooking existSeatBooking = sbrepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Seat Booking with ID "+id+" not found"));
        sbrepo.delete(existSeatBooking);
    }

}

package edu.cit.cinemabs.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.cit.cinemabs.entity.SeatBooking;

@Repository
public interface SeatBookingRepository extends JpaRepository<SeatBooking, Long>{
    
}

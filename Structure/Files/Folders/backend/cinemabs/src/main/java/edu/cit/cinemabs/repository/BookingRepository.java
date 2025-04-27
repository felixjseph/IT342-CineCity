package edu.cit.cinemabs.repository;

import edu.cit.cinemabs.entity.User;
import edu.cit.cinemabs.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUser(User user);
}

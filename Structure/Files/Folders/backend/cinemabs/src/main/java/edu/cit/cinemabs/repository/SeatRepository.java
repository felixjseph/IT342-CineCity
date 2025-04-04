package edu.cit.cinemabs.repository;


import edu.cit.cinemabs.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {

    List<Seat> findByShowtime_ShowtimeId(Integer id);
}

package edu.cit.cinemabs.repository;


import edu.cit.cinemabs.entity.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
}

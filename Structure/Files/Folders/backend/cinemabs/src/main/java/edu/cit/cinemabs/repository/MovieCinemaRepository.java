package edu.cit.cinemabs.repository;

import edu.cit.cinemabs.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieCinemaRepository extends JpaRepository<Showtime,Integer>{

}
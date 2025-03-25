package edu.cit.cinemabs.repository;

import edu.cit.cinemabs.entity.MovieCinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieCinemaRepository extends JpaRepository<MovieCinema,Integer>{

}
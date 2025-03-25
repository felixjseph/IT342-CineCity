package edu.cit.cinemabs.repository;

import edu.cit.cinemabs.entity.MovieGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieGenreRepository extends JpaRepository<MovieGenre, Integer> {
}

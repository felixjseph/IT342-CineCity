package edu.cit.cinemabs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.cit.cinemabs.entity.Genre;

import java.util.List;

@Repository
public interface GenreRepository extends JpaRepository<Genre,Integer>{

    @Query(value = "SELECT * FROM genre WHERE LOWER(genre_name) LIKE LOWER(CONCAT('%', :name, '%'))", nativeQuery = true)
    List<Genre> searchGenresByName(@Param("name") String name);

}

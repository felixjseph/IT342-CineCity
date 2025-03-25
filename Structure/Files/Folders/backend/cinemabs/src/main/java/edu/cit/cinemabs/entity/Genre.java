package edu.cit.cinemabs.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private int id;

    @Column(name = "genre_name")
    private String genre_name;

    @OneToMany(mappedBy = "genre", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Movie> movie;

    public Genre(){}

    public Genre(int id,String genre_name){
        this.genre_name = genre_name;
        this.id = id;
    }

    public void setGenreName(String genre_name){
        this.genre_name = genre_name;
    }

    public String getGenreName(){
        return genre_name;
    }

    public void setId(int id){
        this.id = id;
    }

    public int getId(){
        return id;
    }
}

package edu.cit.cinemabs.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Lob
    private byte[] photo;
    private String title;
    private int duration; //in minutes
    private String synopsis;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "genre_id", nullable = false)
    @JsonIgnoreProperties("movies")
    private Genre genre;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MovieCinema> movie_cinema;

    public Movie(byte[] photo){
        super();
        this.photo = photo;
    }

    public Movie(int id, byte[] photo, String title, int duration, String synopsis, Genre genre){
        this.id = id;
        this.photo = photo;
        this.title = title;
        this.duration = duration;
        this.synopsis = synopsis;
        this.genre = genre;
    }

    public Movie() {
        super();
    }

    public void setId(int id){
        this.id = id;
    }

    public int getId(){
        return id;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getTitle(){
        return title;
    }

    public void setDuration(int duration){
        this.duration = duration;
    }

    public int getDuration(){
        return duration;
    }

    public void setSynopsis(String synopsis){
        this.synopsis = synopsis;
    }

    public String getSynopsis(){
        return synopsis;
    }

    public void setGenre(Genre genre){
        this.genre = genre;
    }

    public Genre getGenre(){
        return genre;
    }
}
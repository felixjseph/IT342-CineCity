package edu.cit.cinemabs.controller;

import java.util.List;

import edu.cit.cinemabs.entity.Genre;
import edu.cit.cinemabs.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/genre")
public class GenreController {
    @Autowired
    GenreService gserv;

    @PostMapping("/addNewGenre")
    public Genre addNewGenre(@RequestBody Genre genre){
        return gserv.addNewGenre(genre);
    }

    @GetMapping("/getAllGenre")
    public List<Genre> getAllGenres(){
        return gserv.getAllGenre();
    }

    @GetMapping("/searchGenres")
    public List<Genre> searchGenres(@RequestParam String name) {
        return gserv.searchGenresByName(name);
    }

    @PutMapping("/updateGenre/{id}")
    public Genre updateGenre(@RequestBody Genre genre, @PathVariable int id){
        return gserv.updateGenre(genre, id);
    }

    @DeleteMapping("/deleteGenre/{id}")
    public void deleteGenre(@PathVariable int id){
        gserv.deleteGenre(id);
    }
}

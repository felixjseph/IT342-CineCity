package com.example.cinecity.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.cinecity.data.model.Movie
import com.example.cinecity.data.model.ShowTime
import com.example.cinecity.data.repository.MovieRepository
import com.example.cinecity.data.util.Resource
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class MovieViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = MovieRepository(application)

    private val _movies = MutableStateFlow<Resource<List<Movie>>?>(null)
    val movies: StateFlow<Resource<List<Movie>>?> = _movies

    private val _movie = MutableStateFlow<Resource<Movie>?>(null)
    val movie: StateFlow<Resource<Movie>?> = _movie

    private val _showTimes = MutableStateFlow<Resource<List<ShowTime>>?>(null)
    val showTimes: StateFlow<Resource<List<ShowTime>>?> = _showTimes

    fun getMovies() {
        _movies.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.getMovies()
            _movies.value = result
        }
    }

    fun getMovieById(movieId: Long) {
        _movie.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.getMovieById(movieId)
            _movie.value = result
        }
    }

    fun getShowTimes(movieId: Long? = null) {
        _showTimes.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.getShowTimes(movieId)
            _showTimes.value = result
        }
    }
}

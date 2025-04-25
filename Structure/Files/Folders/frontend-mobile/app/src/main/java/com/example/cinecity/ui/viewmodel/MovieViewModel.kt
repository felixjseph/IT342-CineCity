package com.example.cinecity.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.cinecity.data.model.Movie
import com.example.cinecity.data.model.ShowtimeDto
import com.example.cinecity.data.repository.MovieRepository
import com.example.cinecity.data.util.Resource
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class MovieViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = MovieRepository(application)

    private val _movies = MutableStateFlow<Resource<List<Movie>>?>(null)
    val movies: StateFlow<Resource<List<Movie>>?> = _movies

    private val _showtimes = MutableStateFlow<Resource<List<ShowtimeDto>>>(Resource.Loading)
    val showtimes: StateFlow<Resource<List<ShowtimeDto>>> = _showtimes

    private val _movie = MutableStateFlow<Resource<Movie>>(Resource.Loading)
    val movie: StateFlow<Resource<Movie>> = _movie

    init {
        getMovies()
    }

    fun getMovies() {
        _movies.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.getMovies()
            _movies.value = result
        }
    }

    fun getShowtimesByMovieId(movieId: Int) {
        viewModelScope.launch {
            try {
                _showtimes.value = Resource.Loading
                val response = repository.getShowtimesByMovieId(movieId)
                _showtimes.value = Resource.Success(response)
            } catch (e: Exception) {
                _showtimes.value = Resource.Error(e.message ?: "Unknown error")
            }
        }
    }
}

package com.example.cinecity.data.repository

import android.content.Context
import com.example.cinecity.data.api.ApiService
import com.example.cinecity.data.api.RetrofitClient
import com.example.cinecity.data.model.Movie
import com.example.cinecity.data.model.ShowtimeDto
import com.example.cinecity.data.util.Resource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class MovieRepository(private val context: Context) {
    private val apiService: ApiService = RetrofitClient.getApiService(context)

    suspend fun getMovies(): Resource<List<Movie>> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.getMovies()

                if (response.isSuccessful) {
                    response.body()?.let {
                        Resource.Success(it)
                    } ?: Resource.Error("Empty response body")
                } else {
                    Resource.Error("Failed to fetch movies: ${response.message()}")
                }
            } catch (e: Exception) {
                Resource.Error("Failed to fetch movies: ${e.message}")
            }
        }
    }

    suspend fun getShowtimesByMovieId(movieId: Int): List<ShowtimeDto> {
        return withContext(Dispatchers.IO) {
            apiService.getShowtimesByMovieId(movieId)
        }
    }
}

package com.example.cinecity.data.api

import com.example.cinecity.data.model.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    // Authentication endpoints
    @POST("auth/login")
    suspend fun login(@Body loginRequest: LoginRequest): Response<LoginResponse>

    @POST("auth/signup")
    suspend fun register(@Body registerRequest: RegisterRequest): Response<User>

    @POST("auth/logout")
    suspend fun logout(): Response<Void>

    @GET("auth/check")
    suspend fun checkLogin(): Response<Boolean>

    // User endpoints
    @GET("users/me")
    suspend fun getCurrentUser(): Response<User>

    @PUT("users/me")
    suspend fun updateProfile(@Body request: UpdateProfileRequest): Response<User>

    // Movie endpoints
    @GET("movie")
    suspend fun getMovies(): Response<List<Movie>>

    @GET("movie/{id}")
    suspend fun getMovieById(@Path("id") id: Long): Response<Movie>

    // Showtimes endpoints
    @GET("showtime/movie/{movieId}")
    suspend fun getShowtimesByMovieId(@Path("movieId") movieId: Int): List<ShowtimeDto>

    //Seat endpoints
    @GET("/seats/showtime/{id}")
    suspend fun getSeatsByShowtimeId(@Path("id") showtimeId: Int): List<SeatDto>

    // Booking endpoints
    @GET("/api/bookings/userbookings")
    suspend fun getBookings(): List<Booking>
}

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
    @GET("movies")
    suspend fun getMovies(): Response<List<Movie>>

    @GET("movies/{id}")
    suspend fun getMovieById(@Path("id") movieId: Long): Response<Movie>

    // Showtimes endpoints
    @GET("showtimes")
    suspend fun getShowTimes(@Query("movieId") movieId: Long? = null): Response<List<ShowTime>>

    // Booking endpoints
    @POST("bookings")
    suspend fun createBooking(@Body booking: BookingRequest): Response<Booking>

    @GET("bookings")
    suspend fun getUserBookings(): Response<List<Booking>>
}

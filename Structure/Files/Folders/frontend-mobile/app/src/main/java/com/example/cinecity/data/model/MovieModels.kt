package com.example.cinecity.data.model

import java.util.Date

data class Movie(
    val id: Long,
    val title: String,
    val description: String,
    val duration: Int,
    val genre: String,
    val releaseDate: String,
    val posterUrl: String,
    val price: Double
)

data class ShowTime(
    val id: Long,
    val movieId: Long,
    val startTime: String,
    val endTime: String,
    val theater: String,
    val price: Double,
    val availableSeats: Int
)

data class BookingRequest(
    val showTimeId: Long,
    val seats: List<String>,
    val totalPrice: Double
)

data class Booking(
    val id: Long,
    val userId: Long,
    val showTimeId: Long,
    val movieTitle: String? = null,
    val cinema: String? = null,
    val dateTime: String? = null,
    val seats: List<String>,
    val totalPrice: Double,
    val bookingDate: String,
    val status: String,
    val paymentMethod: String
)

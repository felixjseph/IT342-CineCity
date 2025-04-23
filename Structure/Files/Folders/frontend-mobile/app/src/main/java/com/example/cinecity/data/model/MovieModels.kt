package com.example.cinecity.data.model

data class Movie(
    val id: Int,
    val title: String,
    val duration: Int,
    val synopsis: String,
    val genre: Genre,
    val photo: String
)

data class Genre(
    val id: Int,
    val genreName: String
)


data class ShowtimeDto(
    val movieCinemaId: Int,
    val date: String,
    val time: String,
    val price: Double,
    val cinema: Cinema,
    val movie: Movie
)

data class Cinema(
    val cinema_ID: Int,
    val cinema_name: String
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

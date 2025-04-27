package com.example.cinecity.data.model
import kotlinx.parcelize.Parcelize
import android.os.Parcelable

@Parcelize
data class Genre(
    val id: Int,
    val genreName: String
) : Parcelable

@Parcelize
data class Cinema(
    val cinema_ID: Int,
    val cinema_name: String
) : Parcelable

@Parcelize
data class Movie(
    val id: Int,
    val title: String,
    val duration: Int,
    val synopsis: String,
    val genre: Genre,
    val photo: String
) : Parcelable

@Parcelize
data class ShowtimeDto(
    val movieCinemaId: Int,
    val date: String,
    val time: String,
    val price: Double,
    val cinema: Cinema,
    val movie: Movie
) : Parcelable

@Parcelize
data class SeatDto(
    val seatId: Int,
    val seatNo: String,
    val showtime: ShowtimeDto,
    val isAvailable: Boolean
) : Parcelable

@Parcelize
data class Booking(
    val bookingId: Int,
    val createdAt: String,
    val amount: Double,
    val paymentMethod: String,
    val status: String,
    val showtime: ShowtimeDto,
    val seat: SeatDto
) : Parcelable



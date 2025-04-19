package com.example.cinecity.data.repository

import android.content.Context
import com.example.cinecity.data.api.ApiService
import com.example.cinecity.data.api.RetrofitClient
import com.example.cinecity.data.model.Booking
import com.example.cinecity.data.model.BookingRequest
import com.example.cinecity.data.util.Resource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class BookingRepository(private val context: Context) {
    private val apiService: ApiService = RetrofitClient.getApiService(context)

    suspend fun createBooking(bookingRequest: BookingRequest): Resource<Booking> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.createBooking(bookingRequest)

                if (response.isSuccessful) {
                    response.body()?.let {
                        Resource.Success(it)
                    } ?: Resource.Error("Empty response body")
                } else {
                    Resource.Error("Failed to create booking: ${response.message()}")
                }
            } catch (e: Exception) {
                Resource.Error("Failed to create booking: ${e.message}")
            }
        }
    }

    suspend fun getUserBookings(): Resource<List<Booking>> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.getUserBookings()

                if (response.isSuccessful) {
                    response.body()?.let {
                        Resource.Success(it)
                    } ?: Resource.Error("Empty response body")
                } else {
                    Resource.Error("Failed to fetch bookings: ${response.message()}")
                }
            } catch (e: Exception) {
                Resource.Error("Failed to fetch bookings: ${e.message}")
            }
        }
    }
}

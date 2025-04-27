package com.example.cinecity.data.repository

import android.content.Context
import com.example.cinecity.data.api.ApiService
import com.example.cinecity.data.api.RetrofitClient
import com.example.cinecity.data.model.Booking

class BookingRepository(private val context: Context) {
    private val apiService: ApiService = RetrofitClient.getApiService(context)

    suspend fun getBookings(): List<Booking> {
        return apiService.getBookings()
    }
}

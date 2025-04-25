package com.example.cinecity.data.repository

import android.content.Context
import com.example.cinecity.data.api.ApiService
import com.example.cinecity.data.api.RetrofitClient
import com.example.cinecity.data.model.SeatDto

class SeatRepository(private val context: Context) {

    private val apiService: ApiService = RetrofitClient.getApiService(context)

    suspend fun getSeatsByShowtimeId(showtimeId: Int): List<SeatDto> {
        return apiService.getSeatsByShowtimeId(showtimeId)
    }
}

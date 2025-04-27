package com.example.cinecity.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.cinecity.data.model.Booking
import com.example.cinecity.data.repository.BookingRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class BookingViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = BookingRepository(application)

    private val _bookings = MutableStateFlow<List<Booking>>(emptyList())
    val bookings: StateFlow<List<Booking>> get() = _bookings

    private val _isLoading = MutableStateFlow(false)
    val isLoading = _isLoading.asStateFlow()

    fun fetchBookings() {
        viewModelScope.launch {
            try {
                _isLoading.value = true
                _bookings.value = repository.getBookings()
                _isLoading.value = false
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}

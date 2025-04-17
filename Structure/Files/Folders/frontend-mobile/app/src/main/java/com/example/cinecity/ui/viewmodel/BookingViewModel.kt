package com.example.cinecity.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.cinecity.data.model.Booking
import com.example.cinecity.data.model.BookingRequest
import com.example.cinecity.data.repository.BookingRepository
import com.example.cinecity.data.util.Resource
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class BookingViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = BookingRepository(application)

    private val _createBookingState = MutableStateFlow<Resource<Booking>?>(null)
    val createBookingState: StateFlow<Resource<Booking>?> = _createBookingState

    private val _bookings = MutableStateFlow<Resource<List<Booking>>?>(null)
    val bookings: StateFlow<Resource<List<Booking>>?> = _bookings

    fun createBooking(bookingRequest: BookingRequest) {
        _createBookingState.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.createBooking(bookingRequest)
            _createBookingState.value = result
        }
    }

    fun getUserBookings() {
        _bookings.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.getUserBookings()
            _bookings.value = result
        }
    }
}

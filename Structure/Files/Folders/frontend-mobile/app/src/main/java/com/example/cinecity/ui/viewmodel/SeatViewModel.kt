package com.example.cinecity.ui.viewmodel

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.cinecity.data.model.SeatDto
import com.example.cinecity.data.model.ShowtimeDto
import com.example.cinecity.data.repository.SeatRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class SeatViewModelFactory(private val repository: SeatRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(SeatViewModel::class.java)) {
            return SeatViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}


class SeatViewModel(private val seatRepository: SeatRepository) : ViewModel() {
    private val _reservedSeats = MutableStateFlow<List<SeatDto>>(emptyList())
    val reservedSeats: StateFlow<List<SeatDto>> get() = _reservedSeats


    private val _selectedSeats = MutableLiveData<List<String>>()
    val selectedSeats: LiveData<List<String>> get() = _selectedSeats

    private val _selectedShowtime = MutableLiveData<ShowtimeDto>()
    val selectedShowtime: LiveData<ShowtimeDto> get() = _selectedShowtime

    fun fetchSeats(showtimeId: Int) {
        viewModelScope.launch {
            val seats = seatRepository.getSeatsByShowtimeId(showtimeId)
            _reservedSeats.value = seats
        }
    }

    fun selectSeat(seatNo: String) {
        val currentSelectedSeats = _selectedSeats.value ?: emptyList()
        _selectedSeats.postValue(
            if (currentSelectedSeats.contains(seatNo)) {
                currentSelectedSeats - seatNo
            } else {
                currentSelectedSeats + seatNo
            }
        )
    }

    fun setShowtime(showtime: ShowtimeDto) {
        _selectedShowtime.postValue(showtime)
    }
}

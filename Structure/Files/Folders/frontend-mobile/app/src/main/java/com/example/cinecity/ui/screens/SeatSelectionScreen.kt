package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.cinecity.data.model.ShowtimeDto
import com.example.cinecity.data.repository.SeatRepository
import com.example.cinecity.ui.viewmodel.SeatViewModel
import com.example.cinecity.ui.viewmodel.SeatViewModelFactory
import com.example.cinecity.data.model.SeatDto

@Composable
fun SeatSelectionScreen(
    selectedShowtime: ShowtimeDto,
    movieTitle: String,
    duration: Int,
    onBack: () -> Unit,
    onCheckout: (selectedSeats: List<String>, selectedShowtimeId: Int) -> Unit,
    repository: SeatRepository,
    seatViewModel: SeatViewModel = viewModel(factory = SeatViewModelFactory(repository))
) {
    val allSeats by seatViewModel.reservedSeats.collectAsState(initial = emptyList())

    var selectedSeats by remember { mutableStateOf<List<String>>(emptyList()) }

    val rows = ('A'..'G').toList()
    val columns = (1..10).toList()
    val seatNumbers = rows.flatMap { row -> columns.map { col -> "$row$col" } }

    LaunchedEffect(selectedShowtime) {
        seatViewModel.fetchSeats(selectedShowtime.movieCinemaId)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1C1C1C))
            .padding(16.dp)
    ) {
        // Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "Back",
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.Medium,
                modifier = Modifier.clickable { onBack() }
            )
            Text(
                text = "Seat Selection",
                color = Color.White,
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.alignByBaseline()
            )
            Spacer(modifier = Modifier.width(60.dp))
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Movie Info
        Text("$movieTitle (${duration} mins)", fontSize = 18.sp, fontWeight = FontWeight.SemiBold, color = Color.White)
        Spacer(modifier = Modifier.height(8.dp))
        Text("Cinema: ${selectedShowtime.cinema.cinema_name}", fontSize = 14.sp, color = Color.LightGray)
        Text("Date: ${selectedShowtime.date}", fontSize = 14.sp, color = Color.LightGray)
        Text("Time: ${selectedShowtime.time}", fontSize = 14.sp, color = Color.LightGray)
        Text("Price: ₱${selectedShowtime.price}", fontSize = 14.sp, color = Color.LightGray)

        Spacer(modifier = Modifier.height(20.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(20.dp)
                .background(Color.Gray),
            contentAlignment = Alignment.Center
        ) {
            Text("Screen", color = Color.White, fontSize = 12.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Seat Grid
        Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
            LazyVerticalGrid(columns = GridCells.Fixed(10), modifier = Modifier.height(280.dp)) {
                items(seatNumbers) { seatNo ->
                    val seat = allSeats.find { it.seatNo == seatNo }
                    val isReserved = seat?.isAvailable == false
                    val isSelected = seatNo in selectedSeats

                    val color = when {
                        isReserved -> Color.Red
                        isSelected -> Color(0xFF00C853)
                        else -> Color.Gray
                    }

                    Box(
                        modifier = Modifier
                            .padding(4.dp)
                            .size(30.dp)
                            .background(color)
                            .clickable(enabled = seat?.isAvailable == true) {
                                selectedSeats = if (isSelected) {
                                    selectedSeats - seatNo
                                } else {
                                    selectedSeats + seatNo
                                }
                            },
                        contentAlignment = Alignment.Center
                    ) {
                        Text(seatNo, fontSize = 10.sp, color = Color.White)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        if (selectedSeats.isNotEmpty()) {
            Text(
                text = "Selected: ${selectedSeats.joinToString(", ")}",
                fontSize = 14.sp,
                color = Color.White
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        Button(
            onClick = {
                onCheckout(selectedSeats, selectedShowtime.movieCinemaId)
            },
            enabled = selectedSeats.isNotEmpty(),
            modifier = Modifier.align(Alignment.CenterHorizontally),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF00C853))
        ) {
            Text("Proceed to Payment", color = Color.White)
        }
    }
}

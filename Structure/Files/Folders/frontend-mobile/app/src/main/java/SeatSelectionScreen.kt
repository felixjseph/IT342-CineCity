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
import com.example.cinecity.data.model.ShowtimeDto

@Composable
fun SeatSelectionScreen(
    movieCinemaId: Int,
    movieTitle: String,
    duration: Int,
    showtimes: List<ShowtimeDto>,
    onBack: () -> Unit,
    onCheckout: (selectedSeats: List<String>, selectedShowtimeId: Int) -> Unit
) {
    var selectedSeats by remember { mutableStateOf<List<String>>(emptyList()) }
    var selectedShowtime by remember { mutableStateOf(showtimes.firstOrNull()) }

    val reservedSeats = listOf("A1", "A2", "B3") // Mock reserved seats for now

    val rows = ('A'..'G').toList()
    val columns = (1..10).toList()
    val seats = rows.flatMap { row -> columns.map { col -> "$row$col" } }

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
            Text("< Back", color = Color.Blue, modifier = Modifier.clickable { onBack() })
            Spacer(modifier = Modifier.width(16.dp))
            Text("Select Seats", fontWeight = FontWeight.Bold, fontSize = 20.sp)
        }

        Spacer(modifier = Modifier.height(12.dp))

        Text("$movieTitle ($duration)", fontSize = 16.sp, fontWeight = FontWeight.SemiBold)

        Spacer(modifier = Modifier.height(8.dp))

        DropdownMenuBox(
            options = showtimes.map { it.time },
            selected = selectedShowtime?.time ?: "",
            onSelectedChange = { time ->
                selectedShowtime = showtimes.firstOrNull { it.time == time }
            }
        )

        Spacer(modifier = Modifier.height(12.dp))

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(20.dp)
                .background(Color.LightGray),
            contentAlignment = Alignment.Center
        ) {
            Text("Screen", color = Color.DarkGray, fontSize = 12.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        LazyVerticalGrid(columns = GridCells.Fixed(10), modifier = Modifier.height(280.dp)) {
            items(seats) { seat ->
                val isReserved = seat in reservedSeats
                val isSelected = seat in selectedSeats

                val color = when {
                    isReserved -> Color.Red
                    isSelected -> Color.Green
                    else -> Color.Gray
                }

                Box(
                    modifier = Modifier
                        .padding(4.dp)
                        .size(30.dp)
                        .background(color)
                        .clickable(enabled = !isReserved && selectedShowtime != null) {
                            selectedSeats = if (seat in selectedSeats) {
                                selectedSeats - seat
                            } else {
                                selectedSeats + seat
                            }
                        },
                    contentAlignment = Alignment.Center
                ) {
                    Text(seat, fontSize = 10.sp, color = Color.White)
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        if (selectedSeats.isNotEmpty()) {
            Text("Selected: ${selectedSeats.joinToString(", ")}", fontSize = 14.sp)
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = {
                if (selectedSeats.isEmpty() || selectedShowtime == null) {
                    println("Please select seats and a showtime")
                } else {
                    onCheckout(selectedSeats, selectedShowtime!!.movieCinemaId)
                }
            },
            enabled = selectedShowtime != null,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        ) {
            Text("Proceed to Payment")
        }
    }
}

@Composable
fun DropdownMenuBox(
    options: List<String>,
    selected: String,
    onSelectedChange: (String) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    Box {
        OutlinedButton(onClick = { expanded = true }) {
            Text(selected.ifEmpty { "Select Showtime" })
        }
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            options.forEach { option ->
                DropdownMenuItem(onClick = {
                    onSelectedChange(option)
                    expanded = false
                }, text = { Text(option) })
            }
        }
    }
}
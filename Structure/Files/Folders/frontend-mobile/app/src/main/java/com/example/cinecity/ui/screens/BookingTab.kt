package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import com.example.cinecity.data.model.Booking
import com.example.cinecity.ui.viewmodel.BookingViewModel
import androidx.compose.runtime.getValue
import androidx.navigation.NavController

@Composable
fun BookingTab(viewModel: BookingViewModel, navController: NavController) {
    val background = Color(0xFF1C1C1C)
    val bookings by viewModel.bookings.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()
    val accentGreen = Color(0xFF33B85A)

    LaunchedEffect(Unit) {
        viewModel.fetchBookings()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(background)
            .padding(12.dp)
    ) {
        when {
            isLoading -> {
                // Show loading spinner
                Column(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    CircularProgressIndicator(color = accentGreen)
                }
            }
            bookings.isEmpty() -> {
                // Show no bookings message
                Column(
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "No bookings yet!",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Start booking your favorite movies.",
                        fontSize = 16.sp,
                        color = Color.Gray
                    )
                }
            }
            else -> {
                // Show list of bookings
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    items(bookings) { booking ->
                        BookingCard(booking = booking, navController = navController)
                    }
                }
            }
        }
    }
}



@Composable
fun BookingCard(booking: Booking, navController: NavController) {
    val green = Color(0xFF33B85A)
    val grayText = Color.Gray

    Card(
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF2D2D2D))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Booking ID: ${booking.bookingId}", fontWeight = FontWeight.Bold, color = green)
                Text(booking.status, color = if (booking.status == "success") green else Color.Red)
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(booking.showtime.movie.title, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color.White)
            Text(booking.showtime.cinema.cinema_name, color = grayText)

            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("${booking.showtime.date} ${booking.showtime.time}", fontSize = 14.sp, color = grayText)
                Text("Paid via: ${booking.paymentMethod}", fontSize = 14.sp, color = grayText)
            }

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = {
                    // Save the booking to the SavedStateHandle
                    navController.currentBackStackEntry?.savedStateHandle?.set("selected_booking", booking)
                    navController.navigate("ticket_screen")
                },
                modifier = Modifier.align(Alignment.End),
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.buttonColors(containerColor = green)
            ) {
                Text("View Ticket", color = Color.White)
            }


        }
    }
}

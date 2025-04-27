package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.cinecity.data.model.Booking
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Card

@Composable
fun TicketScreen(
    booking: Booking,  // Receiving booking directly from NavController
    onClose: () -> Unit
) {
    val background = Color(0xFF1E1F25)
    val green = Color(0xFF33B85A)
    val grayText = Color.Gray

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.4f))
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Card(
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier
                .fillMaxWidth()
                .width(320.dp)
                .background(background)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                // Booking ID and Status
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        "Booking ID: ${booking.bookingId}",
                        fontWeight = FontWeight.Bold,
                        color = green
                    )
                    Text(
                        booking.status,
                        color = if (booking.status == "success") green else Color.Red
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Movie title and cinema name
                Text(
                    booking.showtime.movie.title,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Text(booking.showtime.cinema.cinema_name, color = grayText)

                Spacer(modifier = Modifier.height(8.dp))

                // Showtime date, time, and payment method
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        "${booking.showtime.date} ${booking.showtime.time}",
                        fontSize = 14.sp,
                        color = grayText
                    )
                    Text("Paid via: ${booking.paymentMethod}", fontSize = 14.sp, color = grayText)
                }

                Spacer(modifier = Modifier.height(8.dp))

                // Display selected seat(s)
                Text(
                    "Seat No: ${booking.seat.seatNo}",  // Display the seat number here
                    fontSize = 16.sp,
                    color = Color.White
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Price display
                Text("Amount: ₱${booking.amount}", fontSize = 16.sp, color = Color.White)

                Spacer(modifier = Modifier.height(24.dp))

                // Close button
                Button(
                    onClick = onClose,
                    modifier = Modifier.align(Alignment.CenterHorizontally),
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = green)
                ) {
                    Text("Close", color = Color.White)
                }
            }
        }
    }
}


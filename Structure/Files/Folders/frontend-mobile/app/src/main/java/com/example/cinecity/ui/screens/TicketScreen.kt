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
    booking: Booking,
    onClose: () -> Unit
) {
    val background = Color(0xFF121212)
    val cardColor = Color(0xFF1E1F25)
    val green = Color(0xFF33B85A)
    val grayText = Color(0xFFB0B0B0)

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(background)
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = cardColor),
            elevation = CardDefaults.cardElevation(6.dp),
            modifier = Modifier
                .fillMaxWidth()
                .widthIn(max = 360.dp)
        ) {
            Column(
                modifier = Modifier
                    .padding(20.dp)
                    .fillMaxWidth()
            ) {
                // Header Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "Booking ID: ${booking.bookingId}",
                        color = green,
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp
                    )
                    Text(
                        text = booking.status,
                        color = if (booking.status == "success") green else Color.Red,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 14.sp
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Movie & Cinema
                Text(
                    text = booking.showtime.movie.title,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Text(
                    text = booking.showtime.cinema.cinema_name,
                    color = grayText,
                    fontSize = 14.sp
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Date & Time + Payment Method
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "${booking.showtime.date} ${booking.showtime.time}",
                        fontSize = 14.sp,
                        color = grayText
                    )
                    Text(
                        text = "Paid via: ${booking.paymentMethod}",
                        fontSize = 14.sp,
                        color = grayText
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Seat Number
                Text(
                    text = "Seat No: ${booking.seat.seatNo}",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium,
                    color = Color.White
                )

                Spacer(modifier = Modifier.height(8.dp))

                // Amount
                Text(
                    text = "Amount: ₱${booking.amount}",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Medium,
                    color = Color.White
                )

                Spacer(modifier = Modifier.height(24.dp))

                // Close Button
                Button(
                    onClick = onClose,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp),
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = green)
                ) {
                    Text("Close", fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
                }
            }
        }
    }
}



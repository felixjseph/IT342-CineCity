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


@Composable
fun BookingScreen() {
    val background = Color(0xFF2D2D2D) // Light background like the image
    val bookings = listOf(
        Booking("BK1234", "Avengers: Endgame", "CineCity Mall", "Apr 12, 6:00 PM", "Confirmed", "GCash"),
        Booking("BK5678", "Dune Part Two", "Ayala Center", "Apr 13, 8:30 PM", "Pending", "Credit Card"),
        Booking("BK9012", "Oppenheimer", "SM Seaside", "Apr 14, 7:00 PM", "Cancelled", "PayPal"),
        Booking("BK3234", "Paksiw", "Skina Japan", "Apr 15, 7:00 PM", "Confirmed", "PayPal"),
        Booking("BK1696", "Boanga", "Didto Ragud", "Apr 16, 7:00 PM", "Confirmed", "Cash")
    )

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(background)
            .padding(12.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        items(bookings) { booking ->
            BookingCard(booking)
        }
    }
}

data class Booking(
    val id: String,
    val movie: String,
    val cinema: String,
    val dateTime: String,
    val status: String,
    val payment: String
)

@Composable
fun BookingCard(booking: Booking) {

    val green = Color(0xFF33B85A)
    val grayText = Color.Gray

    Card(
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                modifier = Modifier
                .fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("Booking ID: ${booking.id}", fontWeight = FontWeight.Bold, color = green)
                Text(booking.status, color = if (booking.status == "Confirmed") green else Color.Red)
            }

            Spacer(modifier = Modifier.height(8.dp))

            Text(booking.movie, fontSize = 18.sp, fontWeight = FontWeight.Bold)
            Text(booking.cinema, color = grayText)

            Spacer(modifier = Modifier.height(8.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(booking.dateTime, fontSize = 14.sp, color = grayText)
                Text("Paid via: ${booking.payment}", fontSize = 14.sp, color = grayText)
            }

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = { /* Placeholder for view ticket */ },
                modifier = Modifier.align(Alignment.End),
                shape = RoundedCornerShape(8.dp),
                colors = ButtonDefaults.buttonColors(containerColor = green)
            ) {
                Text("View Ticket", color = Color.White)
            }
        }
    }
}

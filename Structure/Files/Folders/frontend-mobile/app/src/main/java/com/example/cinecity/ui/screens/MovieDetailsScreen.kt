package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.compose.AsyncImage
import com.example.cinecity.data.model.Movie
import com.example.cinecity.data.util.Resource
import com.example.cinecity.ui.viewmodel.MovieViewModel
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.width
import androidx.compose.ui.Alignment
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.ButtonDefaults
import com.example.cinecity.data.model.ShowtimeDto
import java.text.SimpleDateFormat
import java.util.*

fun formatTo12HourLegacy(time24: String): String {
    return try {
        val inputFormat = SimpleDateFormat("HH:mm", Locale.getDefault())
        val outputFormat = SimpleDateFormat("h:mm a", Locale.getDefault())
        val date = inputFormat.parse(time24)
        outputFormat.format(date!!)
    } catch (e: Exception) {
        time24
    }
}


@Composable
fun MovieDetailsScreen(
    movie: Movie,
    viewModel: MovieViewModel = viewModel(),
    onBookNow: (ShowtimeDto) -> Unit,
    onBack: () -> Unit
) {
    val showtimeState = viewModel.showtimes.collectAsState().value
    val scrollState = rememberScrollState()

    LaunchedEffect(Unit) {
        viewModel.getShowtimesByMovieId(movie.id)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .background(Color(0xFF1C1C1C))
            .padding(16.dp)
    ) {
        // Top Bar with Back and Title
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
                text = "Details",
                color = Color.White,
                fontSize = 18.sp,
                fontWeight = FontWeight.SemiBold,
                modifier = Modifier.alignByBaseline()
            )
            Spacer(modifier = Modifier.width(60.dp)) // balances the row visually
        }

        // Poster
        AsyncImage(
            model = "https://it342-cinecity.onrender.com/movie/${movie.id}/cover",
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier
                .height(400.dp)
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
        )

        Spacer(Modifier.height(16.dp))

        // Movie Title & Genre
        Text(movie.title, color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.Bold)
        Text("${movie.genre.genreName} • ${movie.duration} mins", color = Color.Gray, fontSize = 14.sp)

        Spacer(Modifier.height(12.dp))

        // Synopsis
        Text(movie.synopsis, color = Color.White, fontSize = 14.sp)

        Spacer(Modifier.height(20.dp))

        // Showtime Section
        when (val result = showtimeState) {
            is Resource.Success -> {
                val showtimes = result.data ?: emptyList()

                showtimes.groupBy { it.cinema.cinema_name }.forEach { (cinemaName, showList) ->
                    Text(cinemaName, color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(6.dp))

                    showList.forEach { showtime ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 6.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text("\uD83D\uDDD3\uFE0F ${showtime.date} at ${formatTo12HourLegacy(showtime.time)}", color = Color.White)

                                Text("\uD83D\uDCB5 ₱${showtime.price}", color = Color.LightGray)
                            }
                            Button(
                                onClick = { onBookNow(showtime) },
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = Color(0xFF4CAF50),
                                    contentColor = Color.White
                                )
                            ) {
                                Text("Book Now")
                            }
                        }
                    }

                    Spacer(Modifier.height(16.dp))
                }
            }

            is Resource.Loading -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator(color = Color.White)
                }
            }

            is Resource.Error -> Text("Error loading showtimes", color = Color.Red)
            else -> Unit
        }
    }
}


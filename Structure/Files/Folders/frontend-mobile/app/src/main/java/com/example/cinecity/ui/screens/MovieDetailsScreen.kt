package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
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

@Composable
fun MovieDetailsScreen(
    movie: Movie, // passed from previous screen
    viewModel: MovieViewModel = viewModel(),
    onBookNow: (Int) -> Unit,
    onBack: () -> Unit
) {
    val showtimeState = viewModel.showtimes.collectAsState().value


    LaunchedEffect(Unit) {
        viewModel.getShowtimesByMovieId(movie.id)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF1C1C1C))
            .padding(16.dp)
    ) {
        // Back Button
        Text(
            text = "← Back",
            color = Color.White,
            modifier = Modifier
                .clickable { onBack() }
                .padding(bottom = 8.dp)
        )

        // Movie Poster
        AsyncImage(
            model = "http://192.168.254.100:8080/movie/${movie.id}/cover",
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier
                .height(220.dp)
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
        )

        Spacer(Modifier.height(12.dp))

        Text(movie.title, color = Color.White, fontSize = 24.sp, fontWeight = FontWeight.Bold)
        Text("${movie.genre.genreName} • ${movie.duration} mins", color = Color.LightGray, fontSize = 14.sp)
        Spacer(Modifier.height(8.dp))
        Text(movie.synopsis, color = Color.White, fontSize = 14.sp)

        Spacer(Modifier.height(16.dp))

        when (val result = showtimeState) {
            is Resource.Success -> {
                val showtimes = result.data ?: emptyList()

                showtimes.groupBy { it.cinema.cinema_name }.forEach { (cinemaName, showList) ->
                    Text(cinemaName, color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(4.dp))

                    showList.forEach { showtime ->
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text("🕒 ${showtime.date} at ${showtime.time}", color = Color.White)
                                Text("₱${showtime.price}", color = Color.LightGray)
                            }
                            Button(onClick = { onBookNow(showtime.movieCinemaId) }) {
                                Text("Book Now")
                            }
                        }
                    }

                    Spacer(Modifier.height(12.dp))
                }
            }

            is Resource.Loading -> {
                CircularProgressIndicator(color = Color.White)
            }

            is Resource.Error -> {
                Text("Error loading showtimes", color = Color.Red)
            }

            else -> Unit
        }
    }
}

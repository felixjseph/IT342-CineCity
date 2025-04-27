package com.example.cinecity.ui.screens


import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.*
import androidx.lifecycle.viewmodel.compose.viewModel
import coil.ImageLoader
import com.example.cinecity.R
import com.example.cinecity.data.util.Resource
import com.example.cinecity.ui.viewmodel.MovieViewModel
import coil.compose.AsyncImage
import coil.request.ImageRequest
import coil.util.DebugLogger
import com.example.cinecity.data.model.Movie

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MoviesTab(
    modifier: Modifier = Modifier,
    viewModel: MovieViewModel = viewModel(),
    onMovieClick: (Movie) -> Unit = {}
) {
    var searchQuery by remember { mutableStateOf(TextFieldValue("")) }
    val focusManager = LocalFocusManager.current
    val movieState by viewModel.movies.collectAsState()
    val currentState = movieState

    LaunchedEffect(Unit) {
        viewModel.getMovies()
    }

    val movies = when (currentState) {
        is Resource.Success -> currentState.data ?: emptyList()
        else -> emptyList()
    }

    val filteredMovies = movies.filter { movie ->
        movie.title.contains(searchQuery.text, ignoreCase = true)
    }

    Box (
        modifier = Modifier
            .fillMaxSize()
            .clickable(
                // No ripple/visual feedback
                indication = null,
                interactionSource = remember { MutableInteractionSource() }
            ) {
                focusManager.clearFocus() // Clears focus when tapping outside
            }
    ) {
        Column(
            modifier = modifier
                .fillMaxSize()
                .background(Color(0xFF1C1C1C))
                .padding(horizontal = 16.dp, vertical = 12.dp)
        ) {
            Text(
                text = "Movies",
                color = Color.White,
                fontSize = 42.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 12.dp)
            )

            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = { Text("Search for movies...", color = Color.LightGray) },
                leadingIcon = {
                    Icon(
                        imageVector = Icons.Default.Search,
                        contentDescription = "Search Icon",
                        tint = Color.LightGray
                    )
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(70.dp)
                    .padding(bottom = 12.dp),
                singleLine = true,
                shape = RoundedCornerShape(50.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    unfocusedContainerColor = Color(0xFF2A2A2A),
                    focusedContainerColor = Color(0xFF2A2A2A),
                    focusedTextColor = Color.White,
                    unfocusedTextColor = Color.White,
                    cursorColor = Color.White
                )
            )


            Text(
                text = "Now Showing",
                color = Color.White,
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(bottom = 12.dp)
            )

            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 160.dp),
                contentPadding = PaddingValues(bottom = 16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(filteredMovies) { movie ->
                    MovieCard(movie = movie, onClick = { onMovieClick(movie) })
                }
            }
        }
    }
}

@Composable
fun MovieCard(movie: Movie, onClick: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1C1C1C)),
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            val imageUrl = "https://it342-cinecity.onrender.com/movie/${movie.id}/cover"

            val context = LocalContext.current
            val imageLoader = ImageLoader.Builder(context)
                .logger(DebugLogger()) // <- Logs errors to Logcat
                .build()

            AsyncImage(
                model = ImageRequest.Builder(context)
                    .data(imageUrl)
                    .crossfade(true)
                    .error(R.drawable.image_error)
                    .build(),
                contentDescription = movie.title,
                imageLoader = imageLoader,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .height(260.dp)
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .clickable { onClick() }
            )

            Spacer(modifier = Modifier.height(8.dp))

            Text(
                text = movie.title,
                color = Color.White,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth()
            )

        }
    }
}
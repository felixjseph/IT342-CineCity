package com.example.cinecity.ui.screens

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.example.cinecity.data.util.Resource
import com.example.cinecity.ui.components.BottomNavBar
import com.example.cinecity.ui.navigation.BottomNavItem
import com.example.cinecity.ui.viewmodel.MovieViewModel

@Composable
fun HomeScreen(
    onLogoutSuccess: () -> Unit = {}
) {
    val navController = rememberNavController()
    val bottomNavItems = listOf(
        BottomNavItem.Home,
        BottomNavItem.Movies,
        BottomNavItem.Bookings,
        BottomNavItem.Profile
    )

    Scaffold(
        bottomBar = {
            BottomNavBar(navController = navController, items = bottomNavItems)
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = BottomNavItem.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(BottomNavItem.Home.route) {
                HomeTab(onBrowseClick = {
                    navController.navigate(BottomNavItem.Movies.route) {
                        popUpTo(navController.graph.startDestinationId) {
                            saveState = true
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                })
            }

            composable(BottomNavItem.Movies.route) {
                MoviesTab(
                    onMovieClick = { movie ->
                        navController.navigate("movie_details/${movie.id}")
                    }
                )
            }


            composable("movie_details/{movieId}") { backStackEntry ->
                val movieId = backStackEntry.arguments?.getString("movieId")?.toIntOrNull()
                val movieViewModel: MovieViewModel = viewModel()

                val movieState = movieViewModel.movies.collectAsState().value

                val movie = when (movieState) {
                    is Resource.Success -> movieState.data?.find { it.id == movieId }
                    else -> null
                }

                if (movie != null) {
                    MovieDetailsScreen(
                        movie = movie,
                        onBookNow = { movieCinemaId ->
                            navController.navigate("seat_selection/$movieCinemaId/${movie.title}/${movie.duration}")
                        },
                        onBack = { navController.popBackStack() }
                    )
                } else {
                    if (movieState is Resource.Loading) {
                        CircularProgressIndicator(color = Color.White)
                    } else {
                        Text("Movie not found or error loading data.")
                    }
                }
            }

            composable(
                "seat_selection/{movieCinemaId}/{movieTitle}/{duration}",
                arguments = listOf(
                    navArgument("movieCinemaId") { type = NavType.IntType },
                    navArgument("movieTitle") { type = NavType.StringType },
                    navArgument("duration") { type = NavType.IntType },
                )
            ) { backStackEntry ->
                val movieCinemaId = backStackEntry.arguments?.getInt("movieCinemaId") ?: 0
                val movieTitle = backStackEntry.arguments?.getString("movieTitle") ?: ""
                val duration = backStackEntry.arguments?.getInt("duration") ?: 0

                val viewModel: MovieViewModel = viewModel()
                val showtimeState = viewModel.showtimes.collectAsState().value
                val showtimes = if (showtimeState is Resource.Success) showtimeState.data ?: emptyList() else emptyList()

                SeatSelectionScreen(
                    movieCinemaId = movieCinemaId,
                    movieTitle = movieTitle,
                    duration = duration,
                    showtimes = showtimes,
                    onBack = { navController.popBackStack() },
                    onCheckout = { selectedSeats, selectedShowtimeId ->
                        // Handle checkout
                    }
                )
            }



            composable(BottomNavItem.Bookings.route) { BookingTab() }

            composable(BottomNavItem.Profile.route) {
                ProfileTab(
                    onLogoutSuccess = onLogoutSuccess,
                    onEditProfile = { navController.navigate("edit_profile") }
                )
            }

            composable("edit_profile") {
                EditProfileScreen(
                    onBack = { navController.popBackStack() },
                    onSaveSuccess = {
                        navController.navigate(BottomNavItem.Profile.route) {
                            popUpTo("edit_profile") { inclusive = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
            }
        }

    }
}

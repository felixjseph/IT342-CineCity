package com.example.cinecity.ui.screens

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavType
import androidx.navigation.compose.*
import androidx.navigation.navArgument
import com.example.cinecity.data.model.Booking
import com.example.cinecity.data.model.ShowtimeDto
import com.example.cinecity.data.repository.SeatRepository
import com.example.cinecity.data.util.Resource
import com.example.cinecity.ui.components.BottomNavBar
import com.example.cinecity.ui.navigation.BottomNavItem
import com.example.cinecity.ui.screens.SeatSelectionScreen
import com.example.cinecity.ui.viewmodel.BookingViewModel
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
                        onBookNow = { showtime ->
                            navController.currentBackStackEntry?.savedStateHandle?.set("selected_showtime", showtime)
                            navController.navigate("seat_selection")
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

            composable("seat_selection") {
                val showtime = navController.previousBackStackEntry
                    ?.savedStateHandle
                    ?.get<ShowtimeDto>("selected_showtime")

                val context = LocalContext.current

                if (showtime != null) {
                    SeatSelectionScreen(
                        selectedShowtime = showtime,
                        movieTitle = showtime.movie.title,
                        duration = showtime.movie.duration,
                        onBack = { navController.popBackStack() },
                        onCheckout = { selectedSeats, selectedShowtimeId ->
                            navController.navigate("payment")
                        },
                        repository = SeatRepository(context)
                    )
                } else {
                    Text("Showtime not found.")
                }
            }

            composable("payment") {
                PaymentScreen(onBack = { navController.navigate("home") })
            }


            composable(BottomNavItem.Bookings.route) {
                val bookingViewModel: BookingViewModel = viewModel()
                BookingTab(viewModel = bookingViewModel, navController = navController)
            }


            composable("ticket_screen") {
                val booking = navController.previousBackStackEntry
                    ?.savedStateHandle
                    ?.get<Booking>("selected_booking")

                if (booking != null) {
                    TicketScreen(
                        booking = booking,
                        onClose = { navController.popBackStack() }
                    )
                } else {
                    Text("Ticket not found.")
                }
            }

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

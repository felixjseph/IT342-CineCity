package com.example.cinecity.ui.screens

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.*
import com.example.cinecity.ui.components.BottomNavBar
import com.example.cinecity.ui.navigation.BottomNavItem

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
            composable(BottomNavItem.Movies.route) { MoviesTab() }
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

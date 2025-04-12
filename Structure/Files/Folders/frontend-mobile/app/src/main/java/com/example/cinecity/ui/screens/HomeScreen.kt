package com.example.cinecity.ui.screens

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.*
import com.example.cinecity.ui.components.BottomNavBar
import com.example.cinecity.ui.navigation.BottomNavItem

@Composable
fun HomeScreen() {
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
            composable(BottomNavItem.Home.route) { HomeTab() }
            composable(BottomNavItem.Movies.route) { MoviesTab() }
            composable(BottomNavItem.Bookings.route) { BookingsTab() }
            composable(BottomNavItem.Profile.route) { ProfileScreen() }
        }
    }
}
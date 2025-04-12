package com.example.cinecity.ui.navigation

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.ui.graphics.vector.ImageVector

sealed class BottomNavItem(val title: String, val icon: ImageVector, val route: String) {
    object Home : BottomNavItem("Home", Icons.Default.Home, "home")
    object Movies : BottomNavItem("Movies", Icons.Default.Movie, "movies")
    object Bookings : BottomNavItem("Bookings", Icons.Default.ShoppingCart, "bookings")
    object Profile : BottomNavItem("Profile", Icons.Default.Person, "profile")
}
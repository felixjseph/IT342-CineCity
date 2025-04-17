package com.example.cinecity.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.cinecity.ui.screens.HomeScreen
import com.example.cinecity.ui.screens.LoginScreen
import com.example.cinecity.ui.screens.SignUpScreen
import com.example.cinecity.ui.screens.WelcomeScreen
import com.example.cinecity.ui.viewmodel.AuthViewModel

@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    val authViewModel: AuthViewModel = viewModel()

    var isLoggedIn by remember { mutableStateOf(authViewModel.isLoggedIn()) }

    // Check if user is logged in
    LaunchedEffect(Unit) {
        isLoggedIn = authViewModel.isLoggedIn()
    }

    NavHost(
        navController = navController,
        startDestination = if (isLoggedIn) "home" else "welcome"
    ) {
        composable("welcome") {
            WelcomeScreen(
                onSignInClick = { navController.navigate("login") },
                onCreateAccountClick = { navController.navigate("signup") }
            )
        }

        composable("login") {
            LoginScreen(
                onLoginSuccess = {
                    isLoggedIn = true
                    navController.navigate("home") {
                        popUpTo("welcome") { inclusive = true }
                    }
                },
                onCreateAccountClick = { navController.navigate("signup") }
            )
        }

        composable("signup") {
            SignUpScreen(
                onBackClick = { navController.popBackStack() },
                onSignUpSuccess = { navController.navigate("login") }
            )
        }

        composable("home") {
            HomeScreen(
                onLogoutSuccess = {
                    isLoggedIn = false
                    navController.navigate("welcome") {
                        popUpTo("home") { inclusive = true }
                    }
                }
            )
        }
    }
}

package com.example.cinecity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.example.cinecity.ui.screens.HomeScreen
import com.example.cinecity.ui.screens.LoginScreen
import com.example.cinecity.ui.screens.WelcomeScreen
import com.example.cinecity.ui.screens.SignUpScreen
import com.example.cinecity.ui.theme.CineCityTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            CineCityTheme {
                Surface (modifier = Modifier.fillMaxSize()) {
                    AppContent()
                }
            }
        }
    }
}

@Composable
fun AppContent() {
    var currentScreen by remember { mutableStateOf("welcome") }

    Scaffold { innerPadding ->
        when (currentScreen) {
            "welcome" -> WelcomeScreen(
                modifier = Modifier.fillMaxSize()
                .padding(innerPadding),
                onSignInClick = { currentScreen = "login" },
                onCreateAccountClick = { currentScreen = "sign up" }
            )

            "login" -> LoginScreen(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding),
                onLoginClick = { username, password ->
                    // Login logic

                    currentScreen = "home"
                },
                onCreateAccountClick = { currentScreen = "sign up" }
            )

            "sign up" -> SignUpScreen(
                modifier = Modifier
                    .fillMaxSize()
                .padding(innerPadding),
            onBackClick = { currentScreen = "welcome" },
            onCreateAccountClick = { username, email, password ->
                // Account Creation logic

                currentScreen = "home"
                }
            )

            "home" -> HomeScreen()
        }
    }
}
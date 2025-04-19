package com.example.cinecity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import com.example.cinecity.ui.navigation.AppNavigation
import com.example.cinecity.ui.theme.CineCityTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CineCityTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    AppNavigation()
                }
            }
        }
    }
}

@Composable
fun AppContent() {
    var currentScreen by rememberSaveable { mutableStateOf("welcome") }

    Scaffold { innerPadding ->
        when (currentScreen) {
            "welcome" -> WelcomeScreen(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding),
                onSignInClick = { currentScreen = "login" },
                onCreateAccountClick = { currentScreen = "sign up" }
            )

            "login" -> LoginScreen(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(innerPadding),
                onLoginClick = { username, password ->
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
                    currentScreen = "home"
                }
            )

            "home" -> HomeScreen()
        }
    }
}


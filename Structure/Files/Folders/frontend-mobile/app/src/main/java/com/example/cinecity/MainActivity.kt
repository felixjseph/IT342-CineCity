package com.example.cinecity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.cinecity.ui.theme.CineCityTheme
import com.example.cinecity.ui.screens.WelcomeScreen
import com.example.cinecity.ui.screens.SignUpScreen
import java.nio.file.WatchEvent

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
                onSignInClick = {},
                onCreateAccountClick = { currentScreen = "sign up"}
            )
            "sign up" -> SignUpScreen(modifier = Modifier.fillMaxSize())
        }
    }
}
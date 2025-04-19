package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.cinecity.data.util.Resource
import com.example.cinecity.ui.components.ProfileItem
import com.example.cinecity.ui.viewmodel.AuthViewModel

@Composable
fun ProfileTab(
    onLogoutSuccess: () -> Unit = {},
    authViewModel: AuthViewModel = viewModel()
) {
    val background = Color(0xFF1C1C1C)
    val cardColor = Color(0xFF2D2D2D)
    val accentGreen = Color(0xFF33B85A)
    val white = Color.White

    var isLoading by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }

    // Collect user data
    val userState = authViewModel.currentUser.collectAsState().value
    val logoutState = authViewModel.logoutState.collectAsState().value

    // Load user data when the screen is first displayed
    LaunchedEffect(Unit) {
        authViewModel.getCurrentUser()
    }

    // Handle logout state changes
    LaunchedEffect(logoutState) {
        when (logoutState) {
            is Resource.Loading -> {
                isLoading = true
                errorMessage = null
            }
            is Resource.Success -> {
                isLoading = false
                errorMessage = null
                onLogoutSuccess()
            }
            is Resource.Error -> {
                isLoading = false
                errorMessage = logoutState.message
            }
            null -> {
                isLoading = false
                errorMessage = null
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(background)
            .padding(horizontal = 16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(32.dp))

        // Profile Icon
        Box(contentAlignment = Alignment.Center) {
            Box(
                modifier = Modifier
                    .size(96.dp)
                    .background(cardColor, CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Person,
                    contentDescription = "Profile Icon",
                    tint = white,
                    modifier = Modifier.size(48.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        when (userState) {
            is Resource.Loading -> {
                CircularProgressIndicator(color = accentGreen)
            }
            is Resource.Success -> {
                val user = userState.data

                Text(
                    text = user.username ?: "User",
                    color = white,
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )

                Spacer(modifier = Modifier.height(32.dp))

                ProfileItem(
                    icon = Icons.Default.Person,
                    label = "Username",
                    value = user.username ?: "User",
                    containerColor = cardColor,
                    textColor = white
                )

                Spacer(modifier = Modifier.height(12.dp))

                ProfileItem(
                    icon = Icons.Default.Email,
                    label = "Email",
                    value = user.email,
                    containerColor = cardColor,
                    textColor = white
                )

                Spacer(modifier = Modifier.height(12.dp))

                ProfileItem(
                    icon = Icons.Default.Visibility,
                    label = "Password",
                    value = "••••••••",
                    trailingIcon = Icons.Default.Refresh,
                    containerColor = cardColor,
                    textColor = white
                )
            }
            is Resource.Error -> {
                Text(
                    text = userState.message,
                    color = Color.Red,
                    modifier = Modifier.padding(vertical = 8.dp)
                )
            }
            null -> {
                // Initial state, do nothing
            }
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Edit Profile Button
        Button(
            onClick = { /* Handle edit */ },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = accentGreen,
                contentColor = white
            )
        ) {
            Text("Edit Profile", fontWeight = FontWeight.SemiBold)
        }

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = { authViewModel.logout() },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.Red,
                contentColor = white
            ),
            enabled = !isLoading
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    color = Color.White,
                    modifier = Modifier.size(24.dp)
                )
            } else {
                Text("Logout", fontWeight = FontWeight.SemiBold)
            }
        }

        // Show error message if any
        errorMessage?.let {
            Text(
                text = it,
                color = Color.Red,
                modifier = Modifier.padding(vertical = 8.dp)
            )
        }

        Spacer(modifier = Modifier.height(32.dp)) // Extra space at bottom
    }
}

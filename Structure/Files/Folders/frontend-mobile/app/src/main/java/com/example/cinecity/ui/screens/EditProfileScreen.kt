package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.selection.TextSelectionColors
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.cinecity.data.util.Resource
import com.example.cinecity.ui.viewmodel.AuthViewModel

@Composable
fun EditProfileScreen(
    onBack: () -> Unit = {},
    onSaveSuccess: () -> Unit = {},
    authViewModel: AuthViewModel = viewModel()
) {
    val background = Color(0xFF1C1C1C)
    val cardColor = Color(0xFF2D2D2D)
    val accentGreen = Color(0xFF33B85A)
    val white = Color.White

    val userState = authViewModel.currentUser.collectAsState().value
    val updateState = authViewModel.updateState.collectAsState().value

    LaunchedEffect(Unit) {
        authViewModel.getCurrentUser()
    }

    var username by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    var isLoading by remember { mutableStateOf(false) }

    // State to toggle password visibility
    var isPasswordVisible by remember { mutableStateOf(false) }

    LaunchedEffect(userState) {
        if (userState is Resource.Success) {
            username = userState.data.usernameField ?: ""
            email = userState.data.email
        }
    }
    val user = (userState as? Resource.Success)?.data

    LaunchedEffect(updateState) {
        when (updateState) {
            is Resource.Loading -> {
                isLoading = true
                errorMessage = null
            }
            is Resource.Success -> {
                isLoading = false
                errorMessage = null
                authViewModel.resetUpdateState()
                onSaveSuccess()
            }
            is Resource.Error -> {
                isLoading = false
                errorMessage = updateState.message
            }

            else -> {
                isLoading = false
                errorMessage = null
            }
        }
    }

    fun isValidEmail(email: String) = android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
    fun isValidPassword(password: String) = password.isEmpty() || password.length >= 8

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(background)
            .padding(horizontal = 24.dp, vertical = 32.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Edit Profile",
            style = MaterialTheme.typography.headlineMedium,
            color = white,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(32.dp))

        ProfileField(
            label = "Username",
            value = username,
            onValueChange = {
                username = it
                errorMessage = null
            },
            placeholderText = user?.usernameField ?: ""
        )


        Spacer(modifier = Modifier.height(16.dp))

        ProfileField(
            label = "Email",
            value = user?.email ?: "",
            onValueChange = {},
            readOnly = true,
            placeholderText = user?.email ?: ""
        )

        Spacer(modifier = Modifier.height(16.dp))

        ProfileField(
            label = "New Password (optional)",
            value = password,
            onValueChange = {
                password = it
                errorMessage = null
            },
            isPassword = true,
            placeholderText = "Enter new password",
            isPasswordVisible = isPasswordVisible, // Pass visibility state
            onPasswordToggle = { isPasswordVisible = !isPasswordVisible } // Toggle visibility
        )

        Spacer(modifier = Modifier.height(24.dp))

        errorMessage?.let {
            Text(it, color = Color.Red, modifier = Modifier.padding(bottom = 8.dp))
        }

        Button(
            onClick = {
                when {
                    username.isBlank() || email.isBlank() -> errorMessage = "Fields cannot be empty."
                    !isValidEmail(email) -> errorMessage = "Invalid email format."
                    !isValidPassword(password) -> errorMessage = "Password must be 8+ characters."
                    else -> authViewModel.updateProfile(username, email, if (password.isBlank()) null else password)
                }
            },
            enabled = !isLoading,
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            shape = RoundedCornerShape(16.dp),
            colors = ButtonDefaults.buttonColors(containerColor = accentGreen)
        ) {
            if (isLoading) {
                CircularProgressIndicator(color = white, strokeWidth = 2.dp, modifier = Modifier.size(24.dp))
            } else {
                Text("Save", color = white, fontWeight = FontWeight.SemiBold)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        TextButton(onClick = onBack) {
            Text("Cancel", color = Color.LightGray)
        }
    }
}

@Composable
fun ProfileField(
    label: String,
    value: String,
    onValueChange: (String) -> Unit,
    isPassword: Boolean = false,
    readOnly: Boolean = false,
    placeholderText: String = "",
    isPasswordVisible: Boolean = false,
    onPasswordToggle: () -> Unit = {}
) {
    val white = Color.White
    val accentGreen = Color(0xFF33B85A)

    // Visual transformation to show or hide the password
    val visualTransformation = if (isPassword && !isPasswordVisible) {
        PasswordVisualTransformation()
    } else {
        VisualTransformation.None
    }

    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        label = { Text(label, color = Color.LightGray) },
        placeholder = { Text(placeholderText, color = Color.Gray) },
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(14.dp),
        visualTransformation = visualTransformation,
        readOnly = readOnly,
        trailingIcon = {
            if (isPassword) {
                IconButton(onClick = onPasswordToggle) {
                    val icon = if (isPasswordVisible) Icons.Default.VisibilityOff else Icons.Default.Visibility
                    Icon(
                        imageVector = icon,
                        contentDescription = if (isPasswordVisible) "Hide password" else "Show password",
                        tint = Color.LightGray
                    )
                }
            }
        },
        colors = OutlinedTextFieldDefaults.colors(
            // Make container transparent
            unfocusedContainerColor = Color.Transparent,
            focusedContainerColor = Color.Transparent,
            // Text colors
            focusedTextColor = white,
            unfocusedTextColor = white,
            // Cursor and selection colors
            cursorColor = accentGreen,
            selectionColors = TextSelectionColors(
                handleColor = accentGreen,
                backgroundColor = accentGreen.copy(alpha = 0.3f)
            ),
            // Border colors
            focusedBorderColor = accentGreen,
            unfocusedBorderColor = Color.Gray,
            // Label colors when focused
            focusedLabelColor = accentGreen,
            unfocusedLabelColor = Color.LightGray
        )
    )
}

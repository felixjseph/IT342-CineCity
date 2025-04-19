package com.example.cinecity.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.cinecity.R
import com.example.cinecity.data.util.Resource
import com.example.cinecity.ui.viewmodel.AuthViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(
    modifier: Modifier = Modifier,
    onLoginSuccess: () -> Unit = {},
    onCreateAccountClick: () -> Unit = {},
    authViewModel: AuthViewModel = viewModel()
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var isLoading by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf<String?>(null) }

    // Collect login state
    val loginState = authViewModel.loginState.collectAsState().value

    // Handle login state changes
    LaunchedEffect(loginState) {
        when (loginState) {
            is Resource.Loading -> {
                isLoading = true
                errorMessage = null // Clear the error message when loading
            }
            is Resource.Success -> {
                isLoading = false
                errorMessage = null
                onLoginSuccess() // Trigger on login success callback
                authViewModel.resetLoginState() // Reset the login state
            }
            is Resource.Error -> {
                isLoading = false
                errorMessage = loginState.message // Show error message
            }
            else -> {  // Catch-all for other unhandled states
                isLoading = false
                errorMessage = null
            }
        }
    }


    Column(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFF2D2D2D))
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Spacer(modifier = Modifier.height(150.dp))

        Image(
            painter = painterResource(id = R.drawable.cinecitylogo),
            contentDescription = "Logo",
            modifier = Modifier
                .width(300.dp)
                .height(150.dp)
                .padding(vertical = 16.dp)
        )

        Spacer(modifier = Modifier.height(8.dp))

        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            placeholder = { Text("Email", color = Color.LightGray) },
            shape = RoundedCornerShape(12.dp),
            colors = OutlinedTextFieldDefaults.colors(
                unfocusedContainerColor = Color(0xFF444444),
                focusedContainerColor = Color(0xFF444444),
                focusedTextColor = Color.White,
                unfocusedTextColor = Color.White,
                cursorColor = Color.White
            ),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(12.dp))

        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            placeholder = { Text("Password", color = Color.LightGray) },
            visualTransformation = PasswordVisualTransformation(),
            shape = RoundedCornerShape(12.dp),
            colors = OutlinedTextFieldDefaults.colors(
                unfocusedContainerColor = Color(0xFF444444),
                focusedContainerColor = Color(0xFF444444),
                focusedTextColor = Color.White,
                unfocusedTextColor = Color.White,
                cursorColor = Color.White
            ),
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(24.dp))

        // Show error message if any
        errorMessage?.let {
            Text(
                text = it,
                color = Color.Red,
                modifier = Modifier.padding(vertical = 8.dp)
            )
        }

        Button(
            onClick = {
                if (email.isBlank() || password.isBlank()){
                    errorMessage = "Email and password must not be empty."
                } else {
                    authViewModel.login(email, password)
                }},
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF33B85A)),
            enabled = !isLoading
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    color = Color.White,
                    modifier = Modifier.size(24.dp)
                )
            } else {
                Text("Login", color = Color.White)
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        Row (
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Text(
                "Don't have an account?",
                color = Color.LightGray,
                style = LocalTextStyle.current.copy(
                    fontSize = 16.sp
                )
            )
            Spacer(modifier = Modifier.width(4.dp))
            Text(
                "Create",
                style = TextStyle(
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF33B85A),
                    fontSize = 16.sp
                ),
                modifier = Modifier.clickable { onCreateAccountClick() }
            )
        }
    }
}

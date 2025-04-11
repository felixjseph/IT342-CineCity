package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.foundation.Image
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.res.painterResource
import com.example.cinecity.R

@Composable
fun WelcomeScreen(
    modifier: Modifier = Modifier,
    onSignInClick: () -> Unit,
    onCreateAccountClick: () -> Unit
) {
    Box(
        modifier = modifier
            .fillMaxSize()
            .background(Color(0xFF2D2D2D)),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .align(Alignment.Center)
                .wrapContentSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Cinecity Logo Image
            Image(
                painter = painterResource(id = R.drawable.cinecitylogo),
                contentDescription = "CineCity Logo",
                modifier = Modifier
                    .height(150.dp)
                    .width(350.dp)
            )

            Button(
                onClick = onSignInClick,
                modifier = Modifier
                    .width(220.dp)
                    .height(48.dp)
                    .align(Alignment.CenterHorizontally),
                shape = RoundedCornerShape(5.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color.White
                ),
                contentPadding = PaddingValues(vertical = 12.dp)
            ) {
                Text(
                    text = "SIGN IN",
                    color = Color.Black,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            Button(
                onClick = onCreateAccountClick,
                modifier = Modifier
                    .width(220.dp)
                    .height(48.dp)
                    .align(Alignment.CenterHorizontally),
                shape = RoundedCornerShape(5.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = Color(0xFF33B85A)
                ),
                contentPadding = PaddingValues(vertical = 12.dp)
            ) {
                Text(
                    text = "CREATE ACCOUNT",
                    color = Color.White,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}
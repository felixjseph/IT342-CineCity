package com.example.cinecity.ui.screens

import androidx.compose.foundation.R
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun PaymentScreen(onBack: () -> Unit) {
    val backgroundColor = Color(0xFF1C1C1C)
    val green = Color(0xFF00C853)
    val lightGray = Color(0xFFB0B0B0)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundColor)
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        // Logo (use your actual logo composable or image loader)
        Icon(
            painter = painterResource(id = com.example.cinecity.R.drawable.cinecitylogo), // Replace with your logo file
            contentDescription = "CineCity Logo",
            tint = Color.Unspecified,
            modifier = Modifier
                .size(250.dp)
                .padding(bottom = 8.dp)
        )

        Text(
            text = "Payment Portal",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )

        Spacer(modifier = Modifier.height(16.dp))

        Text(
            text = "This feature only works in our web application.",
            fontSize = 16.sp,
            color = lightGray,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(horizontal = 16.dp)
        )

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = "Please visit:",
            fontSize = 14.sp,
            color = Color.White
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "system-integ-cinecity.vercel.app",
            fontSize = 16.sp,
            fontWeight = FontWeight.SemiBold,
            color = green
        )

        Spacer(modifier = Modifier.height(32.dp))

        Button(
            onClick = { onBack() },
            colors = ButtonDefaults.buttonColors(containerColor = green),
            shape = RoundedCornerShape(12.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
        ) {
            Text("Back to Home", fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
        }
    }
}

package com.example.cinecity.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
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
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.cinecity.ui.components.ProfileItem

@Composable
fun ProfileScreen() {
    val background = Color(0xFF2D2D2D)
    val cardColor = Color(0xFF444444)
    val accentGreen = Color(0xFF33B85A)
    val white = Color.White

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

        Text(
            text = "Felix Joseph",
            color = white,
            style = MaterialTheme.typography.titleLarge,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(32.dp))

        ProfileItem(
            icon = Icons.Default.Person,
            label = "Username",
            value = "Felix Joseph",
            containerColor = cardColor,
            textColor = white
        )

        Spacer(modifier = Modifier.height(12.dp))

        ProfileItem(
            icon = Icons.Default.Email,
            label = "Email",
            value = "felixjoseph.castaneda@cit.edu",
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
            onClick = { /* Handle edit */ },
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            shape = RoundedCornerShape(12.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.Red,
                contentColor = white
            )
        ) {
            Text("Logout", fontWeight = FontWeight.SemiBold)
        }

        Spacer(modifier = Modifier.height(32.dp)) // Extra space at bottom
    }
}

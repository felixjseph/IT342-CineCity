package com.example.cinecity.data.model

import com.google.gson.annotations.SerializedName

data class LoginRequest(
    val email: String,
    val password: String
)

data class RegisterRequest(
    val email: String,
    val password: String,
    val username: String
)

data class LoginResponse(
    val token: String,

    @SerializedName("expiresIn")
    val expiresIn: Long
)

data class User(
    val id: Long? = null,
    val email: String,
    val username: String? = null,
    val password: String? = null,
    val roles: List<String>? = null,
    val enabled: Boolean = true,
    val accountNonExpired: Boolean = true,
    val credentialsNonExpired: Boolean = true,
    val accountNonLocked: Boolean = true,
    val authorities: List<Authority>? = null
)

data class Authority(
    val authority: String
)

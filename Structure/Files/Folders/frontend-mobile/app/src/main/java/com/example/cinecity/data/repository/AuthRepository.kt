package com.example.cinecity.data.repository

import android.content.Context
import com.example.cinecity.data.api.ApiService
import com.example.cinecity.data.api.RetrofitClient
import com.example.cinecity.data.local.CookieManager
import com.example.cinecity.data.model.LoginRequest
import com.example.cinecity.data.model.LoginResponse
import com.example.cinecity.data.model.RegisterRequest
import com.example.cinecity.data.model.User
import com.example.cinecity.data.util.Resource
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class AuthRepository(private val context: Context) {
    private val apiService: ApiService = RetrofitClient.getApiService(context)
    private val cookieManager: CookieManager = CookieManager(context)

    suspend fun login(email: String, password: String): Resource<LoginResponse> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.login(LoginRequest(email, password))

                if (response.isSuccessful) {
                    response.body()?.let { loginResponse ->
                        Resource.Success(loginResponse)
                    } ?: Resource.Error("Empty response body")
                } else {
                    Resource.Error("Login failed: ${response.message()}")
                }
            } catch (e: Exception) {
                Resource.Error("Login failed: ${e.message}")
            }
        }
    }

    suspend fun register(email: String, password: String, username: String): Resource<User> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.register(RegisterRequest(email, password, username))

                if (response.isSuccessful) {
                    response.body()?.let { user ->
                        Resource.Success(user)
                    } ?: Resource.Error("Empty response body")
                } else {
                    Resource.Error("Registration failed: ${response.message()}")
                }
            } catch (e: Exception) {
                Resource.Error("Registration failed: ${e.message}")
            }
        }
    }

    suspend fun logout(): Resource<Boolean> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.logout()

                if (response.isSuccessful) {
                    cookieManager.clearCookies()
                    Resource.Success(true)
                } else {
                    Resource.Error("Logout failed: ${response.message()}")
                }
            } catch (e: Exception) {
                Resource.Error("Logout failed: ${e.message}")
            }
        }
    }

    suspend fun checkLogin(): Resource<Boolean> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.checkLogin()

                if (response.isSuccessful) {
                    response.body()?.let { isLoggedIn ->
                        Resource.Success(isLoggedIn)
                    } ?: Resource.Error("Empty response body")
                } else {
                    Resource.Error("Check login failed: ${response.message()}")
                }
            } catch (e: Exception) {
                Resource.Error("Check login failed: ${e.message}")
            }
        }
    }

    suspend fun getCurrentUser(): Resource<User> {
        return withContext(Dispatchers.IO) {
            try {
                val response = apiService.getCurrentUser()

                if (response.isSuccessful) {
                    response.body()?.let { user ->
                        Resource.Success(user)
                    } ?: Resource.Error("Empty response body")
                } else {
                    Resource.Error("Failed to get user: ${response.message()}")
                }
            } catch (e: Exception) {
                Resource.Error("Failed to get user: ${e.message}")
            }
        }
    }

    fun isLoggedIn(): Boolean {
        return cookieManager.isLoggedIn()
    }
}

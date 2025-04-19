package com.example.cinecity.ui.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.example.cinecity.data.model.LoginResponse
import com.example.cinecity.data.model.User
import com.example.cinecity.data.repository.AuthRepository
import com.example.cinecity.data.util.Resource
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class AuthViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = AuthRepository(application)

    private val _loginState = MutableStateFlow<Resource<LoginResponse>?>(null)
    val loginState: StateFlow<Resource<LoginResponse>?> = _loginState

    private val _registerState = MutableStateFlow<Resource<User>?>(null)
    val registerState: StateFlow<Resource<User>?> = _registerState

    private val _logoutState = MutableStateFlow<Resource<Boolean>?>(null)
    val logoutState: StateFlow<Resource<Boolean>?> = _logoutState

    private val _currentUser = MutableStateFlow<Resource<User>?>(null)
    val currentUser: StateFlow<Resource<User>?> = _currentUser

    private val _updateState = MutableStateFlow<Resource<User>?>(null)
    val updateState: StateFlow<Resource<User>?> = _updateState

    fun resetUpdateState() {
        _updateState.value = null
    }

    fun login(email: String, password: String) {
        _loginState.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.login(email, password)
            _loginState.value = result
        }
    }

    fun register(email: String, password: String, username: String) {
        _registerState.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.register(email, password, username)
            _registerState.value = result
        }
    }

    fun logout() {
        _logoutState.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.logout()
            _logoutState.value = result
        }
    }

    fun getCurrentUser() {
        _currentUser.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.getCurrentUser()
            _currentUser.value = result
        }
    }

    fun isLoggedIn(): Boolean {
        return repository.isLoggedIn()
    }

    fun resetLoginState() {
        _loginState.value = null
    }

    fun resetRegisterState() {
        _registerState.value = null
    }

    fun updateProfile(username: String, email: String, password: String?) {
        _updateState.value = Resource.Loading
        viewModelScope.launch {
            val result = repository.updateProfile(username, email, password)
            _updateState.value = result
        }
    }
}

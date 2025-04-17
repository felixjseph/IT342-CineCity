package com.example.cinecity.data.local

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import okhttp3.Cookie
import okhttp3.CookieJar
import okhttp3.HttpUrl

class CookieManager(context: Context) : CookieJar {
    private val masterKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()

    private val sharedPreferences: SharedPreferences = EncryptedSharedPreferences.create(
        context,
        "cookie_prefs",
        masterKey,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )

    override fun saveFromResponse(url: HttpUrl, cookies: List<Cookie>) {
        val editor = sharedPreferences.edit()

        for (cookie in cookies) {
            // Save the JWT token cookie
            if (cookie.name == "token") {
                editor.putString(cookie.name, cookie.value)
                editor.putLong("token_expiry", cookie.expiresAt)
            }
        }

        editor.apply()
    }

    override fun loadForRequest(url: HttpUrl): List<Cookie> {
        val cookies = ArrayList<Cookie>()

        // Check if we have a token cookie
        val tokenValue = sharedPreferences.getString("token", null)
        val tokenExpiry = sharedPreferences.getLong("token_expiry", 0)

        if (tokenValue != null && tokenExpiry > System.currentTimeMillis()) {
            val cookie = Cookie.Builder()
                .name("token")
                .value(tokenValue)
                .domain(url.host)
                .path("/")
                .expiresAt(tokenExpiry)
                .build()

            cookies.add(cookie)
        }

        return cookies
    }

    fun clearCookies() {
        sharedPreferences.edit().clear().apply()
    }

    fun getToken(): String? {
        return sharedPreferences.getString("token", null)
    }

    fun isLoggedIn(): Boolean {
        val tokenExpiry = sharedPreferences.getLong("token_expiry", 0)
        return tokenExpiry > System.currentTimeMillis()
    }
}

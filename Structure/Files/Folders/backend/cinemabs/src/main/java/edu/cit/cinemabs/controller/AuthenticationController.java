package edu.cit.cinemabs.controller;

import edu.cit.cinemabs.dto.LoginUserDto;
import edu.cit.cinemabs.dto.RegisterUserDto;
import edu.cit.cinemabs.entity.User;
import edu.cit.cinemabs.service.AuthenticationService;
import edu.cit.cinemabs.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import edu.cit.cinemabs.dto.LoginResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserDetailsService userDetailsService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService,
            UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/signup/admin")
    public ResponseEntity<User> registerAdmin(@RequestBody RegisterUserDto registerUserDto) {
        User registeredAdmin = authenticationService.signupAdmin(registerUserDto);
        return ResponseEntity.ok(registeredAdmin);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto,
                                                      HttpServletResponse response) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);

        // Set the token in an HTTP-only cookie
        Cookie cookie = new Cookie("token", jwtToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) jwtService.getExpirationTime());

        // Manually set the SameSite attribute in the Set-Cookie header
        response.addHeader("Set-Cookie", "token=" + jwtToken + "; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=" + jwtService.getExpirationTime());

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken)
                .setExpiresIn(jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }
    
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkLogin(HttpServletRequest request, HttpServletResponse response) {
        try {
            String jwt = getJwtFromCookies(request);
            if (jwt == null) {
                return ResponseEntity.ok(false);
            }

            // Check if token is expired
            if (jwtService.isTokenExpired(jwt)) {
                // Clear the expired token cookie
                Cookie cookie = new Cookie("token", null);
                cookie.setHttpOnly(true);
                cookie.setSecure(true);
                cookie.setPath("/");
                cookie.setMaxAge(0);
                cookie.setDomain(request.getServerName());
                response.addCookie(cookie);
                return ResponseEntity.ok(false);
            }

            String username = jwtService.extractUsername(jwt);
            if (username == null) {
                return ResponseEntity.ok(false);
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (!jwtService.isTokenValid(jwt, userDetails)) {
                return ResponseEntity.ok(false);
            }

            return ResponseEntity.ok(true);
        } catch (Exception e) {
            // If any exception occurs during token validation, return false
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        // Clear the JWT cookie
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setDomain(request.getServerName());
        response.addCookie(cookie);

        // Clear the authentication context
        SecurityContextHolder.clearContext();

        // Add cache control headers
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");

        return ResponseEntity.noContent().build();
    }


    private String getJwtFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
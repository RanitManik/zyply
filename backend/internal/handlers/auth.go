package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/RanitManik/zyply/internal/auth"
	"github.com/RanitManik/zyply/internal/config"
	"github.com/RanitManik/zyply/internal/models"
)

// AuthHandler handles authentication requests
type AuthHandler struct {
	Config *config.Config
}

// NewAuthHandler creates a new AuthHandler
func NewAuthHandler(cfg *config.Config) *AuthHandler {
	return &AuthHandler{
		Config: cfg,
	}
}

// SignupRequest represents a signup request
type SignupRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginRequest represents a login request
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// AuthResponse represents an authentication response
type AuthResponse struct {
	Token string       `json:"token"`
	User  *models.User `json:"user"`
}

// ForgotPasswordRequest represents a forgot password request
type ForgotPasswordRequest struct {
	Email string `json:"email"`
}

// Signup handles user signup
func (h *AuthHandler) Signup(w http.ResponseWriter, r *http.Request) {
	// Parse request
	var req SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate request
	if req.Name == "" || req.Email == "" || req.Password == "" {
		http.Error(w, "Name, email, and password are required", http.StatusBadRequest)
		return
	}

	// Create user
	user, err := models.CreateUser(req.Name, req.Email, req.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Generate token
	token, err := auth.GenerateToken(user.ID, user.Email, h.Config)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Return response
	resp := AuthResponse{
		Token: token,
		User:  user,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// Login handles user login
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	// Parse request
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate request
	if req.Email == "" || req.Password == "" {
		http.Error(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	// Get user
	user, err := models.GetUserByEmail(req.Email)
	if err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	// Verify password
	if !user.VerifyPassword(req.Password) {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	// Generate token
	token, err := auth.GenerateToken(user.ID, user.Email, h.Config)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Return response
	resp := AuthResponse{
		Token: token,
		User:  user,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// GitHubLogin initiates GitHub OAuth flow
func (h *AuthHandler) GitHubLogin(w http.ResponseWriter, r *http.Request) {
	// Get OAuth config
	oauthConfig := auth.GetGitHubOAuthConfig(h.Config)

	// Generate state
	state := fmt.Sprintf("%d", time.Now().UnixNano())

	// Store state in cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "oauth_state",
		Value:    state,
		Path:     "/",
		HttpOnly: true,
		Secure:   r.TLS != nil,
		MaxAge:   int(5 * time.Minute.Seconds()),
	})

	// Redirect to GitHub
	url := oauthConfig.AuthCodeURL(state)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// GitHubCallback handles GitHub OAuth callback
func (h *AuthHandler) GitHubCallback(w http.ResponseWriter, r *http.Request) {
	// Get state from cookie
	stateCookie, err := r.Cookie("oauth_state")
	if err != nil {
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	// Validate state
	if r.URL.Query().Get("state") != stateCookie.Value {
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	// Get code
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Code is required", http.StatusBadRequest)
		return
	}

	// Exchange code for token
	oauthConfig := auth.GetGitHubOAuthConfig(h.Config)
	token, err := oauthConfig.Exchange(r.Context(), code)
	if err != nil {
		http.Error(w, "Failed to exchange code for token", http.StatusInternalServerError)
		return
	}

	// Get user info
	githubUser, err := auth.GetGitHubUser(token, h.Config)
	if err != nil {
		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
		return
	}

	// Process user
	providerData, _ := json.Marshal(githubUser)
	user, err := auth.ProcessOAuthUser(
		models.ProviderGitHub,
		fmt.Sprintf("%d", githubUser.ID),
		githubUser.Email,
		githubUser.Name,
		string(providerData),
	)
	if err != nil {
		http.Error(w, "Failed to process user", http.StatusInternalServerError)
		return
	}

	// Generate token
	jwtToken, err := auth.GenerateToken(user.ID, user.Email, h.Config)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Redirect to frontend with token
	redirectURL := fmt.Sprintf("%s/auth/callback?token=%s", h.Config.Server.FrontendURL, jwtToken)
	http.Redirect(w, r, redirectURL, http.StatusTemporaryRedirect)
}

// GoogleLogin initiates Google OAuth flow
func (h *AuthHandler) GoogleLogin(w http.ResponseWriter, r *http.Request) {
	// Get OAuth config
	oauthConfig := auth.GetGoogleOAuthConfig(h.Config)

	// Generate state
	state := fmt.Sprintf("%d", time.Now().UnixNano())

	// Store state in cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "oauth_state",
		Value:    state,
		Path:     "/",
		HttpOnly: true,
		Secure:   r.TLS != nil,
		MaxAge:   int(5 * time.Minute.Seconds()),
	})

	// Redirect to Google
	url := oauthConfig.AuthCodeURL(state)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// GoogleCallback handles Google OAuth callback
func (h *AuthHandler) GoogleCallback(w http.ResponseWriter, r *http.Request) {
	// Get state from cookie
	stateCookie, err := r.Cookie("oauth_state")
	if err != nil {
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	// Validate state
	if r.URL.Query().Get("state") != stateCookie.Value {
		http.Error(w, "Invalid state", http.StatusBadRequest)
		return
	}

	// Get code
	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Code is required", http.StatusBadRequest)
		return
	}

	// Exchange code for token
	oauthConfig := auth.GetGoogleOAuthConfig(h.Config)
	token, err := oauthConfig.Exchange(r.Context(), code)
	if err != nil {
		http.Error(w, "Failed to exchange code for token", http.StatusInternalServerError)
		return
	}

	// Get user info
	googleUser, err := auth.GetGoogleUser(token, h.Config)
	if err != nil {
		http.Error(w, "Failed to get user info", http.StatusInternalServerError)
		return
	}

	// Process user
	providerData, _ := json.Marshal(googleUser)
	user, err := auth.ProcessOAuthUser(
		models.ProviderGoogle,
		googleUser.ID,
		googleUser.Email,
		googleUser.Name,
		string(providerData),
	)
	if err != nil {
		http.Error(w, "Failed to process user", http.StatusInternalServerError)
		return
	}

	// Generate token
	jwtToken, err := auth.GenerateToken(user.ID, user.Email, h.Config)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Redirect to frontend with token
	redirectURL := fmt.Sprintf("%s/auth/callback?token=%s", h.Config.Server.FrontendURL, jwtToken)
	http.Redirect(w, r, redirectURL, http.StatusTemporaryRedirect)
}

// Me gets the current user
func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	// Get token from header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Authorization header required", http.StatusUnauthorized)
		return
	}

	// Check if it's a Bearer token
	parts := []string{}
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		parts = []string{"Bearer", authHeader[7:]}
	} else {
		parts = []string{}
	}

	if len(parts) != 2 || parts[0] != "Bearer" {
		http.Error(w, "Invalid Authorization header format", http.StatusUnauthorized)
		return
	}

	// Validate token
	tokenString := parts[1]
	claims, err := auth.ValidateToken(tokenString, h.Config)
	if err != nil {
		http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
		return
	}

	// Get user
	user, err := models.GetUserByID(claims.UserID)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Return user
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// ForgotPassword handles password reset requests
func (h *AuthHandler) ForgotPassword(w http.ResponseWriter, r *http.Request) {
	// Parse request
	var req ForgotPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Validate request
	if req.Email == "" {
		http.Error(w, "Email is required", http.StatusBadRequest)
		return
	}

	// Check if user exists
	user, err := models.GetUserByEmail(req.Email)
	if err != nil {
		// Don't reveal that the email doesn't exist for security reasons
		// Just return success even if the email doesn't exist
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "If your email exists in our system, you will receive a password reset link",
		})
		return
	}

	// Generate reset token
	resetToken, err := auth.GenerateToken(user.ID, user.Email, h.Config)
	if err != nil {
		http.Error(w, "Failed to generate reset token", http.StatusInternalServerError)
		return
	}

	// In a real application, you would send an email with the reset link
	// For this example, we'll just return the token
	// TODO: Implement email sending

	// Return success response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Password reset link sent",
		"token":   resetToken, // In production, remove this and send via email
	})
}

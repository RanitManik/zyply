package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/RanitManik/zyply/internal/config"
	"github.com/RanitManik/zyply/internal/models"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

// GitHubUser represents a GitHub user
type GitHubUser struct {
	ID        int    `json:"id"`
	Login     string `json:"login"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	AvatarURL string `json:"avatar_url"`
}

// GoogleUser represents a Google user
type GoogleUser struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	GivenName string `json:"given_name"`
	Picture   string `json:"picture"`
}

// GetGitHubOAuthConfig returns the GitHub OAuth2 config
func GetGitHubOAuthConfig(cfg *config.Config) *oauth2.Config {
	return &oauth2.Config{
		ClientID:     cfg.OAuth.GitHub.ClientID,
		ClientSecret: cfg.OAuth.GitHub.ClientSecret,
		RedirectURL:  cfg.OAuth.GitHub.RedirectURL,
		Scopes:       []string{"user:email"},
		Endpoint:     github.Endpoint,
	}
}

// GetGoogleOAuthConfig returns the Google OAuth2 config
func GetGoogleOAuthConfig(cfg *config.Config) *oauth2.Config {
	return &oauth2.Config{
		ClientID:     cfg.OAuth.Google.ClientID,
		ClientSecret: cfg.OAuth.Google.ClientSecret,
		RedirectURL:  cfg.OAuth.Google.RedirectURL,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}
}

// GetGitHubUser gets user information from GitHub
func GetGitHubUser(token *oauth2.Token, cfg *config.Config) (*GitHubUser, error) {
	// Create client
	client := GetGitHubOAuthConfig(cfg).Client(context.Background(), token)

	// Get user info
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Read response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// Parse response
	var user GitHubUser
	if err := json.Unmarshal(body, &user); err != nil {
		return nil, err
	}

	// If email is not public, get primary email
	if user.Email == "" {
		email, err := getGitHubPrimaryEmail(client)
		if err != nil {
			return nil, err
		}
		user.Email = email
	}

	return &user, nil
}

// getGitHubPrimaryEmail gets the primary email from GitHub
func getGitHubPrimaryEmail(client *http.Client) (string, error) {
	// Get emails
	resp, err := client.Get("https://api.github.com/user/emails")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	// Read response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	// Parse response
	var emails []struct {
		Email    string `json:"email"`
		Primary  bool   `json:"primary"`
		Verified bool   `json:"verified"`
	}
	if err := json.Unmarshal(body, &emails); err != nil {
		return "", err
	}

	// Find primary email
	for _, email := range emails {
		if email.Primary && email.Verified {
			return email.Email, nil
		}
	}

	return "", errors.New("no primary email found")
}

// GetGoogleUser gets user information from Google
func GetGoogleUser(token *oauth2.Token, cfg *config.Config) (*GoogleUser, error) {
	// Create client
	client := GetGoogleOAuthConfig(cfg).Client(context.Background(), token)

	// Get user info
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Read response
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	// Parse response
	var user GoogleUser
	if err := json.Unmarshal(body, &user); err != nil {
		return nil, err
	}

	return &user, nil
}

// ProcessOAuthUser processes an OAuth user and returns or creates a user
func ProcessOAuthUser(provider models.OAuthProvider, providerID, email, name string, providerData string) (*models.User, error) {
	// Check if OAuth account exists
	account, err := models.GetOAuthAccount(provider, providerID)
	if err != nil {
		return nil, fmt.Errorf("error checking OAuth account: %w", err)
	}

	// If account exists, get user
	if account != nil {
		user, err := models.GetUserByID(account.UserID)
		if err != nil {
			return nil, fmt.Errorf("error getting user: %w", err)
		}
		return user, nil
	}

	// Check if user with email exists
	user, err := models.GetUserByEmail(email)
	if err != nil && err.Error() != "user not found" {
		return nil, fmt.Errorf("error checking user: %w", err)
	}

	// If user doesn't exist, create one
	if user == nil {
		// Generate random password for OAuth users
		password := generateRandomPassword()
		user, err = models.CreateUser(name, email, password)
		if err != nil {
			return nil, fmt.Errorf("error creating user: %w", err)
		}
	}

	// Create OAuth account
	_, err = models.CreateOAuthAccount(user.ID, provider, providerID, providerData)
	if err != nil {
		return nil, fmt.Errorf("error creating OAuth account: %w", err)
	}

	return user, nil
}

// generateRandomPassword generates a random password for OAuth users
func generateRandomPassword() string {
	// In a real application, use a proper random generator
	return "oauth-user-" + fmt.Sprintf("%d", time.Now().UnixNano())
}

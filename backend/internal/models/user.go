package models

import (
	"database/sql"
	"errors"
	"time"

	"github.com/RanitManik/zyply/internal/database"
	"golang.org/x/crypto/bcrypt"
)

// User represents a user in the system
type User struct {
	ID        int64     `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"-"` // Never expose password in JSON
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// OAuthProvider represents an OAuth provider type
type OAuthProvider string

const (
	// ProviderGitHub represents GitHub OAuth provider
	ProviderGitHub OAuthProvider = "github"
	// ProviderGoogle represents Google OAuth provider
	ProviderGoogle OAuthProvider = "google"
)

// OAuthAccount represents an OAuth account linked to a user
type OAuthAccount struct {
	ID           int64         `json:"id"`
	UserID       int64         `json:"user_id"`
	Provider     OAuthProvider `json:"provider"`
	ProviderID   string        `json:"provider_id"`
	ProviderData string        `json:"provider_data"`
	CreatedAt    time.Time     `json:"created_at"`
	UpdatedAt    time.Time     `json:"updated_at"`
}

// CreateUser creates a new user in the database
func CreateUser(name, email, password string) (*User, error) {
	// Check if user already exists
	var exists bool
	err := database.DB.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)", email).Scan(&exists)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("user with this email already exists")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// Insert user
	var user User
	err = database.DB.QueryRow(
		"INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id, name, email, created_at, updated_at",
		name, email, string(hashedPassword),
	).Scan(&user.ID, &user.Name, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetUserByEmail retrieves a user by email
func GetUserByEmail(email string) (*User, error) {
	var user User
	err := database.DB.QueryRow(
		"SELECT id, name, email, password, created_at, updated_at FROM users WHERE email = $1",
		email,
	).Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	return &user, nil
}

// GetUserByID retrieves a user by ID
func GetUserByID(id int64) (*User, error) {
	var user User
	err := database.DB.QueryRow(
		"SELECT id, name, email, password, created_at, updated_at FROM users WHERE id = $1",
		id,
	).Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	return &user, nil
}

// VerifyPassword checks if the provided password matches the stored hash
func (u *User) VerifyPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}

// CreateOAuthAccount creates a new OAuth account for a user
func CreateOAuthAccount(userID int64, provider OAuthProvider, providerID, providerData string) (*OAuthAccount, error) {
	var account OAuthAccount
	err := database.DB.QueryRow(
		"INSERT INTO oauth_accounts (user_id, provider, provider_id, provider_data, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, user_id, provider, provider_id, provider_data, created_at, updated_at",
		userID, provider, providerID, providerData,
	).Scan(&account.ID, &account.UserID, &account.Provider, &account.ProviderID, &account.ProviderData, &account.CreatedAt, &account.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return &account, nil
}

// GetOAuthAccount retrieves an OAuth account by provider and provider ID
func GetOAuthAccount(provider OAuthProvider, providerID string) (*OAuthAccount, error) {
	var account OAuthAccount
	err := database.DB.QueryRow(
		"SELECT id, user_id, provider, provider_id, provider_data, created_at, updated_at FROM oauth_accounts WHERE provider = $1 AND provider_id = $2",
		provider, providerID,
	).Scan(&account.ID, &account.UserID, &account.Provider, &account.ProviderID, &account.ProviderData, &account.CreatedAt, &account.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil // No account found, but not an error
		}
		return nil, err
	}

	return &account, nil
}

// GetUserByOAuthAccount retrieves a user by OAuth account
func GetUserByOAuthAccount(provider OAuthProvider, providerID string) (*User, error) {
	var user User
	err := database.DB.QueryRow(
		`SELECT u.id, u.name, u.email, u.password, u.created_at, u.updated_at 
		FROM users u 
		JOIN oauth_accounts oa ON u.id = oa.user_id 
		WHERE oa.provider = $1 AND oa.provider_id = $2`,
		provider, providerID,
	).Scan(&user.ID, &user.Name, &user.Email, &user.Password, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	return &user, nil
}

package config

import (
	"os"
	"time"

	"github.com/joho/godotenv"
)

// Config holds all configuration for the application
type Config struct {
	Database struct {
		Host     string
		Port     string
		User     string
		Password string
		Name     string
		SSLMode  string
	}
	JWT struct {
		Secret string
		Expiry time.Duration
	}
	OAuth struct {
		GitHub struct {
			ClientID     string
			ClientSecret string
			RedirectURL  string
		}
		Google struct {
			ClientID     string
			ClientSecret string
			RedirectURL  string
		}
	}
	Server struct {
		Port        string
		FrontendURL string
	}
}

// LoadConfig loads configuration from environment variables
func LoadConfig() (*Config, error) {
	// Load .env file if it exists
	_ = godotenv.Load()

	cfg := &Config{}

	// Database configuration
	cfg.Database.Host = getEnv("DB_HOST", "localhost")
	cfg.Database.Port = getEnv("DB_PORT", "5432")
	cfg.Database.User = getEnv("DB_USER", "postgres")
	cfg.Database.Password = getEnv("DB_PASSWORD", "postgres")
	cfg.Database.Name = getEnv("DB_NAME", "zyply")
	cfg.Database.SSLMode = getEnv("DB_SSLMODE", "disable")

	// JWT configuration
	cfg.JWT.Secret = getEnv("JWT_SECRET", "your-jwt-secret-key-change-in-production")
	expiryStr := getEnv("JWT_EXPIRY", "24h")
	expiry, err := time.ParseDuration(expiryStr)
	if err != nil {
		expiry = 24 * time.Hour
	}
	cfg.JWT.Expiry = expiry

	// OAuth configuration
	cfg.OAuth.GitHub.ClientID = getEnv("GITHUB_CLIENT_ID", "")
	cfg.OAuth.GitHub.ClientSecret = getEnv("GITHUB_CLIENT_SECRET", "")
	cfg.OAuth.GitHub.RedirectURL = getEnv("GITHUB_REDIRECT_URL", "http://localhost:8080/api/auth/github/callback")

	cfg.OAuth.Google.ClientID = getEnv("GOOGLE_CLIENT_ID", "")
	cfg.OAuth.Google.ClientSecret = getEnv("GOOGLE_CLIENT_SECRET", "")
	cfg.OAuth.Google.RedirectURL = getEnv("GOOGLE_REDIRECT_URL", "http://localhost:8080/api/auth/google/callback")

	// Server configuration
	cfg.Server.Port = getEnv("SERVER_PORT", "8080")
	cfg.Server.FrontendURL = getEnv("FRONTEND_URL", "http://localhost:3000")

	return cfg, nil
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

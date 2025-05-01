package auth

import (
    "fmt"
    "time"

    "github.com/RanitManik/zyply/internal/config"
    "github.com/golang-jwt/jwt/v5"
)

// Claims represents the JWT claims
type Claims struct {
    UserID int64  `json:"user_id"`
    Email  string `json:"email"`
    jwt.RegisteredClaims
}

// GenerateToken generates a JWT token for a user
func GenerateToken(userID int64, email string, cfg *config.Config) (string, error) {
    // Create claims
    claims := &Claims{
        UserID: userID,
        Email:  email,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(cfg.JWT.Expiry)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
            NotBefore: jwt.NewNumericDate(time.Now()),
        },
    }

    // Create token
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    // Sign token
    tokenString, err := token.SignedString([]byte(cfg.JWT.Secret))
    if err != nil {
        return "", err
    }

    return tokenString, nil
}

// ValidateToken validates a JWT token
func ValidateToken(tokenString string, cfg *config.Config) (*Claims, error) {
    // Parse token
    token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
        // Validate signing method
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
        }

        return []byte(cfg.JWT.Secret), nil
    })

    if err != nil {
        return nil, err
    }

    // Get claims
    if claims, ok := token.Claims.(*Claims); ok && token.Valid {
        return claims, nil
    }

    return nil, fmt.Errorf("invalid token")
}
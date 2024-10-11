package entity

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type Account struct {
	ID        string
	Client    *Client
	Balance   float64
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewAccount(client *Client) *Account {

	if client == nil {
		return nil
	}

	return &Account{
		ID:        uuid.New().String(),
		Client:    client,
		Balance:   0,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

func (a *Account) Credit(amount float64) error {
	if amount <= 0 {
		return errors.New("invalid amount")

	}

	a.Balance += amount
	a.UpdatedAt = time.Now()

	return nil
}

func (a *Account) Debit(amount float64) error {
	if amount <= 0 {
		return errors.New("invalid amount")

	}

	if a.Balance < amount {
		return errors.New("insufficient balance")

	}

	a.Balance -= amount
	a.UpdatedAt = time.Now()

	return nil
}

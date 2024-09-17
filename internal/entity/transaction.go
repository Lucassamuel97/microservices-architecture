package entity

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type Transaction struct {
	ID          string
	AccountFrom *Account
	AccountTo   *Account
	Amount      float64
	CreatedAt   time.Time
}

func NewTransaction(accountFrom *Account, accountTo *Account, amount float64) (*Transaction, error) {
	transaction := &Transaction{
		ID:          uuid.New().String(),
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      amount,
		CreatedAt:   time.Now(),
	}

	err := transaction.Validate()
	if err != nil {
		return nil, err
	}

	transaction.Commit()

	return transaction, nil
}

func (t *Transaction) Commit() {
	t.AccountFrom.Debit(t.Amount)
	t.AccountTo.Credit(t.Amount)
}

func (t *Transaction) Validate() error {
	if t.Amount <= 0 {
		return errors.New("amount should be greater than 0")
	}

	if t.AccountFrom == nil {
		return errors.New("account from is required")
	}

	if t.AccountFrom.Balance < t.Amount {
		return errors.New("insufficient funds")
	}

	if t.AccountTo == nil {
		return errors.New("account to is required")
	}

	if t.AccountFrom.Client.ID == t.AccountTo.Client.ID {
		return errors.New("accounts should be different")
	}

	return nil
}

package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateTransaction(t *testing.T) {
	client1, _ := NewClient("John Doe", "j@j")
	account1 := NewAccount(client1)

	client2, _ := NewClient("Jane Doe", "jane@jane")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(1000)

	transaction, err := NewTransaction(account1, account2, 500)

	assert.Nil(t, err)
	assert.NotNil(t, transaction)
	assert.Equal(t, account1.Balance, 500.0)
	assert.Equal(t, account2.Balance, 1500.0)
}

func TestCreateTransactionWithInsufficientBalance(t *testing.T) {
	client1, _ := NewClient("John Doe", "j@j")
	account1 := NewAccount(client1)

	client2, _ := NewClient("Jane Doe", "jane@jane")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(1000)

	transaction, err := NewTransaction(account1, account2, 1500)

	assert.NotNil(t, err)
	assert.Error(t, err, "insufficient funds")
	assert.Nil(t, transaction)
	assert.Equal(t, account1.Balance, 1000.0)
	assert.Equal(t, account2.Balance, 1000.0)
}

func TestCreateTransactionWithInvalidAmount(t *testing.T) {
	client1, _ := NewClient("John Doe", "j@j")
	account1 := NewAccount(client1)

	client2, _ := NewClient("Jane Doe", "jane@jane")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(1000)

	transaction, err := NewTransaction(account1, account2, -500)

	assert.NotNil(t, err)
	assert.Error(t, err, "amount should be greater than 0")
	assert.Nil(t, transaction)
	assert.Equal(t, account1.Balance, 1000.0)
	assert.Equal(t, account2.Balance, 1000.0)
}

func TestCreateTransactionWithSameAccount(t *testing.T) {
	client1, _ := NewClient("John Doe", "j@j")
	account1 := NewAccount(client1)

	account1.Credit(1000)

	transaction, err := NewTransaction(account1, account1, 500)

	assert.NotNil(t, err)
	assert.Error(t, err, "accounts should be different")
	assert.Nil(t, transaction)
	assert.Equal(t, account1.Balance, 1000.0)
}

func TestCreateTransactionWithNilAccount(t *testing.T) {
	client1, _ := NewClient("John Doe", "j@j")
	account1 := NewAccount(client1)

	account1.Credit(1000)

	transaction, err := NewTransaction(account1, nil, 500)

	assert.NotNil(t, err)
	assert.Error(t, err, "account to is required")
	assert.Nil(t, transaction)
	assert.Equal(t, account1.Balance, 1000.0)
}

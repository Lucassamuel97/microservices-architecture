package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateAccout(t *testing.T) {
	client, _ := NewClient("samuca", "samuca@gmail.com")
	account := NewAccount(client)

	assert.NotNil(t, account)
	assert.Equal(t, 0.0, account.Balance)
	assert.Equal(t, client, account.Client)
}

func TestCreateAccoutWhenClientIsNil(t *testing.T) {
	account := NewAccount(nil)

	assert.Nil(t, account)
}

func TestCreditAccount(t *testing.T) {
	client, _ := NewClient("samuca", "s@g.com")
	account := NewAccount(client)

	err := account.Credit(100.0)
	assert.Nil(t, err)
	assert.Equal(t, 100.0, account.Balance)
}

func TestCreditAccountWhenAmountIsInvalid(t *testing.T) {
	client, _ := NewClient("samuca", "s@g.com")
	account := NewAccount(client)

	err := account.Credit(-100.0)
	assert.Error(t, err, "invalid amount")
}

func TestDebitAccount(t *testing.T) {
	client, _ := NewClient("samuca", "s@g.com")
	account := NewAccount(client)
	account.Credit(100.0)
	account.Debit(50.0)

	assert.Equal(t, 50.0, account.Balance)
}

func TestDebitAccountWhenAmountIsInvalid(t *testing.T) {
	client, _ := NewClient("samuca", "s@g.com")
	account := NewAccount(client)
	account.Credit(100.0)
	err := account.Debit(-50.0)

	assert.Error(t, err, "invalid amount")
}

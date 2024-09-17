package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func testCreateNewClient(t *testing.T) {
	client, err := NewClient("samuca", "samuca@gmail.com")
	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.Equal(t, "samuca", client.Name)
	assert.Equal(t, "samuca@gmail.com", client.Email)
}

func TestCreateNewClientWhenArgsAreInvalid(t *testing.T) {
	client, err := NewClient("", "")
	assert.NotNil(t, err)
	assert.Nil(t, client)
}

func testUpdateClient(t *testing.T) {
	client, _ := NewClient("samuca", "samucagmail.com")
	err := client.Update("samuca Update", "s@gmail.com")
	assert.Nil(t, err)
	assert.Equal(t, "samuca Update", client.Name)
	assert.Equal(t, "s@gmail.com", client.Email)
}

func TestUpdateClientWhenArgsAreInvalid(t *testing.T) {
	client, _ := NewClient("samuca", "samucagmail.com")
	err := client.Update("", "s@gmail.com")
	assert.Error(t, err, "name is required")
}

func TestAddAccountToClient(t *testing.T) {
	client, _ := NewClient("samuca", "samucagmail.com")
	account := NewAccount(client)
	err := client.AddAccount(account)
	assert.Nil(t, err)
	assert.Equal(t, 1, len(client.Accounts))
}

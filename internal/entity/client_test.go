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

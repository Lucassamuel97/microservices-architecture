package createclient

import (
	"testing"

	"github.com.br/Lucassamuel97/walletcore/internal/usecase/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateClientUseCase_Execute(t *testing.T) {
	// Arrange
	// Mock
	m := &mocks.ClientGatewayMock{}
	m.On("Save", mock.Anything).Return(nil)

	uc := NewCreateClientUseCase(m)

	input := &CreateClientInputDTO{
		Name:  "Lucas",
		Email: "s@gmail",
	}

	// Act
	output, err := uc.Execute(*input)

	// Assert
	assert.Nil(t, err)
	assert.NotNil(t, output)
	m.AssertExpectations(t)
	m.AssertNumberOfCalls(t, "Save", 1)
	assert.Equal(t, input.Name, output.Name)
	assert.Equal(t, input.Email, output.Email)
	assert.NotEmpty(t, output.ID)
}

func TestCreateClientUseCase_Execute_Error(t *testing.T) {
	// Arrange
	// Mock
	m := &mocks.ClientGatewayMock{}
	m.On("Save", mock.Anything).Return(nil)

	uc := NewCreateClientUseCase(m)

	input := &CreateClientInputDTO{
		Name:  "",
		Email: "s@gmail",
	}

	// Act
	output, err := uc.Execute(*input)

	// Assert
	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Error(t, err, "name is required")
}

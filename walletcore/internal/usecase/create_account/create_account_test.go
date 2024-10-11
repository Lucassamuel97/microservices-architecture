package createaccount

import (
	"testing"

	"github.com.br/Lucassamuel97/walletcore/internal/entity"
	"github.com.br/Lucassamuel97/walletcore/internal/usecase/mocks"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateAccountUseCase_Execute(t *testing.T) {
	// Arrange
	// Mock
	client, _ := entity.NewClient("Lucas", "s@gmail")
	clientMock := &mocks.ClientGatewayMock{}
	clientMock.On("Get", client.ID).Return(client, nil)

	accountMock := &mocks.AccountGatewayMock{}
	accountMock.On("Save", mock.Anything).Return(nil)

	uc := NewCreateAccountUseCase(accountMock, clientMock)

	inputDto := CreateAccountInputDTO{
		ClientID: client.ID,
	}

	// Act
	output, err := uc.Execute(inputDto)

	// Assert
	assert.Nil(t, err)
	assert.NotNil(t, output)

	assert.NotEmpty(t, output.ID)

	// Assert Valid UUID
	_, parseErr := uuid.Parse(output.ID) // Verifica se o UUID é válido
	assert.Nil(t, parseErr, "ID should be a valid UUID")

	clientMock.AssertExpectations(t)
	clientMock.AssertNumberOfCalls(t, "Get", 1)
	accountMock.AssertExpectations(t)
	accountMock.AssertNumberOfCalls(t, "Save", 1)
}

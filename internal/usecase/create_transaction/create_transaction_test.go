package createtransaction

import (
	"context"
	"testing"

	"github.com.br/Lucassamuel97/walletcore/internal/entity"
	"github.com.br/Lucassamuel97/walletcore/internal/event"
	"github.com.br/Lucassamuel97/walletcore/internal/usecase/mocks"
	"github.com.br/Lucassamuel97/walletcore/pkg/events"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateTransactionUseCase_Execute(t *testing.T) {
	// Arrange
	client1, _ := entity.NewClient("Client 1", "client1@gmail.com")
	account1 := entity.NewAccount(client1)
	account1.Credit(1000)

	client2, _ := entity.NewClient("Client 2", "client2@gmail.com")
	account2 := entity.NewAccount(client2)
	account2.Credit(1000)

	// Mock
	mockUow := &mocks.UowMock{}
	mockUow.On("Do", mock.Anything, mock.Anything).Return(nil)

	inputDto := CreateTransactionInputDTO{
		AccountIDFrom: account1.ID,
		AccountIDTo:   account2.ID,
		Amount:        100,
	}

	dispatcher := events.NewEventDispatcher()
	eventTransaction := event.NewTransactionCreated()
	ctx := context.Background()

	uc := NewCreateTransactionUseCase(mockUow, dispatcher, eventTransaction)

	// Act
	output, err := uc.Execute(ctx, inputDto)

	// Assert
	assert.Nil(t, err)
	assert.NotNil(t, output)
	mockUow.AssertExpectations(t)
	mockUow.AssertNumberOfCalls(t, "Do", 1)
}

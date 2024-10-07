package createtransaction

import (
	"errors"
	"testing"

	"github.com.br/Lucassamuel97/walletcore/internal/entity"
	"github.com.br/Lucassamuel97/walletcore/internal/event"
	"github.com.br/Lucassamuel97/walletcore/pkg/events"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type TransactionGatewayMock struct {
	mock.Mock
}

func (m *TransactionGatewayMock) Create(transaction *entity.Transaction) error {
	args := m.Called(transaction)
	return args.Error(0)
}

type AccountGatewayMock struct {
	mock.Mock
}

func (m *AccountGatewayMock) Save(account *entity.Account) error {
	args := m.Called(account)
	return args.Error(0)
}

func (m *AccountGatewayMock) FindByID(id string) (*entity.Account, error) {
	args := m.Called(id)
	if args.Get(0) != nil {
		return args.Get(0).(*entity.Account), args.Error(1)
	}
	return nil, args.Error(1)
}

func (m *AccountGatewayMock) UpdateBalance(account *entity.Account) error {
	args := m.Called(account)
	return args.Error(0)
}

func TestCreateTransactionUseCase_Execute(t *testing.T) {
	// Arrange
	client1, _ := entity.NewClient("Client 1", "client1@gmail.com")
	account1 := entity.NewAccount(client1)
	account1.Credit(1000)

	client2, _ := entity.NewClient("Client 2", "client2@gmail.com")
	account2 := entity.NewAccount(client2)
	account2.Credit(1000)
	// Mock
	mockAccount := &AccountGatewayMock{}
	mockAccount.On("FindByID", account1.ID).Return(account1, nil)
	mockAccount.On("FindByID", account2.ID).Return(account2, nil)

	mockTransaction := &TransactionGatewayMock{}
	mockTransaction.On("Create", mock.Anything).Return(nil)

	inputDto := CreateTransactionInputDTO{
		AccountIDFrom: account1.ID,
		AccountIDTo:   account2.ID,
		Amount:        100,
	}

	dispatcher := events.NewEventDispatcher()
	event := event.NewTransactionCreated()

	uc := NewCreateTransactionUseCase(mockTransaction, mockAccount, dispatcher, event)

	// Act
	output, err := uc.Execute(inputDto)

	// Assert
	assert.Nil(t, err)
	assert.NotNil(t, output)
	mockAccount.AssertExpectations(t)
	mockTransaction.AssertExpectations(t)
	mockAccount.AssertNumberOfCalls(t, "FindByID", 2)
	mockTransaction.AssertNumberOfCalls(t, "Create", 1)
}

func TestCreateTransactionUseCase_Execute_AccountNotFound(t *testing.T) {
	// Arrange
	client1, _ := entity.NewClient("Client 1", "client1@gmail.com")
	account1 := entity.NewAccount(client1)

	// Mock
	mockAccount := &AccountGatewayMock{}
	mockAccount.On("FindByID", account1.ID).Return(account1, nil)
	// Simula que ao tentar encontrar a account2, o FindByID retorna um erro diretamente
	mockAccount.On("FindByID", "non-existing-account-id").Return(nil, errors.New("Account not found"))

	mockTransaction := &TransactionGatewayMock{}
	mockTransaction.On("Create", mock.Anything).Return(nil)

	inputDto := CreateTransactionInputDTO{
		AccountIDFrom: account1.ID,
		AccountIDTo:   "non-existing-account-id", // ID que não existe
		Amount:        100,
	}

	dispatcher := events.NewEventDispatcher()
	event := event.NewTransactionCreated()

	uc := NewCreateTransactionUseCase(mockTransaction, mockAccount, dispatcher, event)

	// Act
	output, err := uc.Execute(inputDto)

	// Assert
	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Equal(t, "Account not found", err.Error()) // Verifica se o erro esperado foi retornado
	mockAccount.AssertExpectations(t)
	mockAccount.AssertNumberOfCalls(t, "FindByID", 2)
	mockTransaction.AssertNumberOfCalls(t, "Create", 0)
}

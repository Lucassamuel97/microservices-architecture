package createtransaction

import (
	"fmt"

	"github.com.br/Lucassamuel97/walletcore/internal/entity"
	"github.com.br/Lucassamuel97/walletcore/internal/gateway"
	"github.com.br/Lucassamuel97/walletcore/pkg/events"
)

type CreateTransactionInputDTO struct {
	AccountIDFrom string  `json:"account_id_from"`
	AccountIDTo   string  `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

type CreateTransactionOutputDTO struct {
	ID string `json:"id"`
}

type CreateTransactionUseCase struct {
	transactionGateway gateway.TransactionGateway
	accountGateway     gateway.AccountGateway
	EventDispatcher    events.EventDispatcherInterface
	TransactionCreated events.EventInterface
}

func NewCreateTransactionUseCase(
	transactionGateway gateway.TransactionGateway,
	accountGateway gateway.AccountGateway,
	eventDispatcher events.EventDispatcherInterface,
	transactionCreated events.EventInterface,
) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		transactionGateway: transactionGateway,
		accountGateway:     accountGateway,
		EventDispatcher:    eventDispatcher,
		TransactionCreated: transactionCreated,
	}
}

func (uc *CreateTransactionUseCase) Execute(input CreateTransactionInputDTO) (*CreateTransactionOutputDTO, error) {
	accountFrom, err := uc.accountGateway.FindByID(input.AccountIDFrom)
	if err != nil {
		fmt.Println("Erro ao buscar conta de origem:", err)
		return nil, err
	}

	accountTo, err := uc.accountGateway.FindByID(input.AccountIDTo)
	if err != nil {
		fmt.Println("Erro ao buscar conta de destino:", err)
		return nil, err
	}

	transaction, err := entity.NewTransaction(accountFrom, accountTo, input.Amount)
	if err != nil {
		fmt.Println("Erro ao criar transação:", err)
		return nil, err
	}
	err = uc.transactionGateway.Create(transaction)
	if err != nil {
		fmt.Println("Erro ao salvar transação:", err)
		return nil, err
	}

	output := &CreateTransactionOutputDTO{
		ID: transaction.ID,
	}

	uc.TransactionCreated.SetPayload(output)
	uc.EventDispatcher.Dispatch(uc.TransactionCreated)

	return output, nil
}

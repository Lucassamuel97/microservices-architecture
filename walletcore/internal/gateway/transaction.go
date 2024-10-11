package gateway

import "github.com.br/Lucassamuel97/walletcore/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}

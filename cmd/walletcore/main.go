package main

import (
	"database/sql"
	"fmt"

	"github.com.br/Lucassamuel97/walletcore/internal/database"
	"github.com.br/Lucassamuel97/walletcore/internal/event"
	createaccount "github.com.br/Lucassamuel97/walletcore/internal/usecase/create_account"
	createclient "github.com.br/Lucassamuel97/walletcore/internal/usecase/create_client"
	createtransaction "github.com.br/Lucassamuel97/walletcore/internal/usecase/create_transaction"
	"github.com.br/Lucassamuel97/walletcore/pkg/events"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True&loc=Local", "root", "root", "mysql", "3306", "wallet"))
	if err != nil {
		panic(err)
	}

	defer db.Close()

	eventDispatcher := events.NewEventDispatcher()
	transactionCreatedEvent := event.NewTransactionCreated()

	// eventDispatcher.Register("TransactionCreated", handler)

	clientDb := database.NewClientDB(db)
	accountDb := database.NewAccountDB(db)
	transactionDb := database.NewTransactionDB(db)

	createClientUseCase := createclient.NewCreateClientUseCase(clientDb)
	createAccountUseCase := createaccount.NewCreateAccountUseCase(accountDb, clientDb)
	createTransactionUseCase := createtransaction.NewCreateTransactionUseCase(transactionDb, accountDb, eventDispatcher, transactionCreatedEvent)

}

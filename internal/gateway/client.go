package gateway

import "github.com.br/Lucassamuel97/walletcore/internal/entity"

type ClientGateway interface {
	Get(id string) (*entity.Client, error)
	Save(client *entity.Client) error
}

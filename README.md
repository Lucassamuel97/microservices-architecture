# Exemplo de Projeto Utilizando Arquitetura de Microsserviços e EDA (Event-Driven Architecture)

Este repositório contém um projeto desenvolvido durante os cursos de Arquitetura de **Microsserviços** e **EDA - Event Driven Architecture** do curso Full Cycle 3.0. O projeto utiliza uma arquitetura de microsserviços com Event-Driven Architecture (EDA) e Kafka para comunicação assíncrona entre os serviços. O objetivo deste projeto é demonstrar como implementar uma comunicação eficiente e escalável entre microsserviços.

## Representação Gráfica do Projeto

![Representação Gráfica](./graphic.png)

O **Apache Kafka** é a peça central da arquitetura orientada a eventos. O microsserviço **Walletcore** atua como o `Producer`, sendo responsável por enviar as mensagens (eventos) para os tópicos `transactions` e `balances` no Kafka. Esses tópicos se conectam aos broker(s), que são responsáveis por armazenar as mensagens de forma durável e ordenada dentro das partições, para serem lidas posteriormente pelos `Consumers`.

No caso, o `Consumer` é o microsserviço **Ms-Balance**, que lê os eventos do tópico `balances` disponibilizados pelo servidor Kafka.

O projeto também utiliza o **Zookeeper**, que armazena os metadados dos brokers e tópicos, auxiliando na recuperação dos servidores Kafka em caso de falha. O Zookeeper também gerencia os metadados dos offsets das mensagens lidas pelos consumers nas partições.

Além disso, é utilizado o **Confluent Control Center**, uma ferramenta que facilita o monitoramento e a gestão do Kafka. Ele permite a visualização de tópicos, brokers, producers, consumers, bem como o acompanhamento dos fluxos de mensagens e métricas detalhadas, ajudando a garantir que o sistema funcione corretamente.

## Estrutura do Repositório

### Database
    Este diretório contém o arquivo init.sql, que, ao executar o projeto pelo Docker Compose, é inserido em `/docker-entrypoint-initdb.d/init.sql`. Este arquivo é responsável pela criação e inserção de registros iniciais nas bases de dados `wallet` e `ms_balance`.

### Walletcore
    O **Walletcore** é um microsserviço desenvolvido em **Go** que é responsável pelo cadastro de clientes, contas e transações. Esses dados são persistidos em um banco de dados relacional MySQL (Database nomeada como `wallet`). Sempre que uma transação é criada, um evento chamado **TransactionCreated** é disparado. Durante a transação, também ocorre a atualização do saldo das contas: a conta do cliente que realiza a transação é debitada, enquanto a conta do cliente que recebe o valor é creditada. Após a atualização do saldo, um evento **BalanceUpdated** é acionado. Esses eventos são enviados para o Kafka e armazenados nos tópicos `transactions` e `balances`.

### Ms-Balance
    O microsserviço **Ms-Balance** é desenvolvido em **NodeJS** utilizando o **Typescript**, sendo responsável por disponibilizar um endpoint REST para a consulta do saldo de cada conta. Ele recupera os eventos publicados no tópico `balances` do Kafka e, ao fazer isso, atualiza o registro existente ou cria um novo registro contendo o Account ID e o saldo atualizado. Esses dados são persistidos em um banco de dados relacional MySQL (Database nomeada como `ms_balance`).  

## Executando aplicação com docker-compose
```bash
    docker-compose up --build
```

## Testando endpoints

- walletcore - Endpoints de criação de clientes, Contas e realização de transações disponivel em `walletcore/api/client.http`.
- ms-balance - Endpoint de consulda do saldo de uma conta GET disponivel em `ms-balance/api/client.http` realizando a requesição http://localhost:3003/balances/{account_id}.


## Referencial teórico

- [Apache Kafka: O que é e como funciona?](https://blog.dp6.com.br/apache-kafka-o-que-%C3%A9-e-como-funciona-300a5736e388)
- Módulo Arquitetura baseada em microsserviços - Curso Full Cycle 3.0.
- Módulo EDA - Event Driven Architecture - Curso Full Cycle 3.0.




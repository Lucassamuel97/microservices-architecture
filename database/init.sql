CREATE DATABASE IF NOT EXISTS wallet;
CREATE DATABASE IF NOT EXISTS ms_balance;

USE wallet;

CREATE TABLE IF NOT EXISTS `clients` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` varchar(255) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `created_at` date DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `transactions` (
  `id` varchar(255) DEFAULT NULL,
  `account_id_from` varchar(255) DEFAULT NULL,
  `account_id_to` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `created_at` date DEFAULT NULL
);


USE ms_balance;

CREATE TABLE IF NOT EXISTS `balance` (
  `id` varchar(255) DEFAULT NULL,
  `account_id` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
);
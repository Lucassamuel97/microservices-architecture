CREATE DATABASE IF NOT EXISTS wallet;
CREATE DATABASE IF NOT EXISTS ms_balance;

USE wallet;

-- ----------------------------
-- Table structure for clients
-- ----------------------------

CREATE TABLE IF NOT EXISTS `clients` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL
);

-- ----------------------------
-- Records of clients
-- ----------------------------
INSERT INTO `clients` VALUES ('c26425d8-d0f3-4a91-bb96-a1f8fddc3653', 'Lucas', 'lucas@l.com', '2024-10-11');
INSERT INTO `clients` VALUES ('c995e35d-1927-4cbb-b873-8e9dc946f062', 'Samuca', 'samuca@s.com', '2024-10-11');

-- ----------------------------
-- Table structure for accounts
-- ----------------------------

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` varchar(255) DEFAULT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `created_at` date DEFAULT NULL
);

-- ----------------------------
-- Records of accounts
-- ----------------------------
INSERT INTO `accounts` VALUES ('7dfe0fa9-d168-4329-a9ba-ca1b7052fac3', 'c26425d8-d0f3-4a91-bb96-a1f8fddc3653', 1000, '2024-10-11');
INSERT INTO `accounts` VALUES ('c6aee752-9977-46c3-9fa0-29e14f85f73f', 'c995e35d-1927-4cbb-b873-8e9dc946f062', 1000, '2024-10-11');

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` varchar(255) DEFAULT NULL,
  `account_id_from` varchar(255) DEFAULT NULL,
  `account_id_to` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `created_at` date DEFAULT NULL
);

USE ms_balance;

-- ----------------------------
-- Table structure for balances
-- ----------------------------

CREATE TABLE IF NOT EXISTS `balances` (
  `id` varchar(255) DEFAULT NULL,
  `account_id` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL
);

-- ----------------------------
-- Records of balances
-- ----------------------------
INSERT INTO `balances` VALUES ('2705d1a8-cf63-4664-b299-f5490bf9ba4e', '7dfe0fa9-d168-4329-a9ba-ca1b7052fac3', 1000);
INSERT INTO `balances` VALUES ('97521a6c-58d7-4c07-966c-75d23f0d50a4', 'c6aee752-9977-46c3-9fa0-29e14f85f73f', 1000);
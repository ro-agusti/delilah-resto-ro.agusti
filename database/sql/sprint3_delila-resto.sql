-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2021 at 09:32 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sprint3_delila-resto`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail`
--

CREATE TABLE `detail` (
  `ID_order` int(11) NOT NULL,
  `orders_ID` int(11) NOT NULL,
  `product_ID` int(11) NOT NULL,
  `amount` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail`
--

INSERT INTO `detail` (`ID_order`, `orders_ID`, `product_ID`, `amount`) VALUES
(27, 51, 4, 44),
(28, 51, 4, 22),
(29, 51, 4, 33),
(45, 65, 4, 33),
(46, 65, 4, 22),
(48, 66, 4, 22),
(49, 66, 4, 33),
(50, 67, 8, 4),
(51, 67, 4, 2),
(52, 67, 9, 3),
(53, 68, 8, 4),
(54, 68, 4, 2),
(55, 68, 9, 3),
(56, 69, 8, 4),
(57, 69, 4, 2),
(58, 69, 9, 3),
(66, 73, 4, 2),
(67, 73, 9, 3),
(68, 74, 8, 1),
(69, 74, 4, 2),
(70, 74, 9, 3),
(71, 75, 8, 1),
(72, 75, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `ID_orders` int(11) NOT NULL,
  `state` enum('NUEVO','CONFIRMADO','PREPARANDO','ENVIANDO','ENTREGADO') NOT NULL DEFAULT 'NUEVO',
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `payment_type` enum('TARJETA','TRANSFERENCIA','EFECTIVO') NOT NULL,
  `user_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`ID_orders`, `state`, `time`, `payment_type`, `user_ID`) VALUES
(51, 'PREPARANDO', '2021-08-19 19:32:10', 'TARJETA', 3),
(53, 'NUEVO', '2021-08-23 23:18:47', 'EFECTIVO', 3),
(54, 'NUEVO', '2021-08-23 23:20:03', 'EFECTIVO', 3),
(55, 'NUEVO', '2021-08-23 23:37:38', 'EFECTIVO', 3),
(56, 'NUEVO', '2021-08-23 23:39:41', 'EFECTIVO', 3),
(57, 'NUEVO', '2021-08-23 23:46:58', 'EFECTIVO', 3),
(58, 'NUEVO', '2021-08-23 23:49:43', 'EFECTIVO', 3),
(59, 'PREPARANDO', '2021-08-23 23:51:18', 'EFECTIVO', 3),
(60, 'NUEVO', '2021-08-23 23:54:46', 'EFECTIVO', 3),
(61, 'NUEVO', '2021-08-23 23:55:55', 'EFECTIVO', 3),
(62, 'NUEVO', '2021-08-23 23:56:26', 'EFECTIVO', 3),
(63, 'NUEVO', '2021-08-23 23:57:02', 'EFECTIVO', 3),
(64, 'NUEVO', '2021-08-23 23:59:25', 'EFECTIVO', 3),
(65, 'NUEVO', '2021-08-24 00:00:05', 'EFECTIVO', 3),
(66, 'NUEVO', '2021-08-24 00:01:22', 'EFECTIVO', 3),
(67, 'NUEVO', '2021-08-24 00:03:00', 'EFECTIVO', 3),
(68, 'PREPARANDO', '2021-08-24 00:05:16', 'EFECTIVO', 3),
(69, 'PREPARANDO', '2021-08-24 12:33:19', 'EFECTIVO', 3),
(73, 'NUEVO', '2021-08-25 18:45:57', 'EFECTIVO', 3),
(74, 'NUEVO', '2021-08-25 18:46:13', 'TARJETA', 3),
(75, 'NUEVO', '2021-08-25 19:26:07', 'EFECTIVO', 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ID_product` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` int(100) NOT NULL,
  `image` tinyblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ID_product`, `product_name`, `price`, `image`) VALUES
(4, 'pizza', 550, ''),
(8, 'hamburguesa', 750, ''),
(9, 'hamburguesa', 350, ''),
(12, 'LOMITO', 1100, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `name & surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `password` varchar(150) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID_user`, `username`, `name & surname`, `email`, `telephone`, `address`, `password`, `role`) VALUES
(2, 'ADMINISTRADOR', 'ADMINISTRADOR1', 'user1@hotmail.com', '21354548', 'san martin 455', '12345Us##', 'ADMIN'),
(3, 'user1', 'user modificado', 'user1@hotmail.com', '21354548', 'san martin 452', '12345Us#', 'USER'),
(25, 'user2', 'user1', 'user1@hotmail.com', '21354548', 'san martin 452', '12345Us#', 'USER'),
(26, 'user4', 'user1', 'user1@hotmail.com', '21354548', 'san martin 452', '12345Us#', 'USER'),
(27, 'user5', 'user1', 'user1@hotmail.com', '21354548', 'san martin 452', '12345Us#', 'USER'),
(28, 'user7', 'user1', 'user1@hotmail.com', '21354548', 'san martin 452', '12345Us#', 'USER'),
(29, 'user8', 'user1', 'user1@hotmail.com', '21354548', 'san martin 452', '12345Us#', 'USER'),
(30, 'user10', 'user1', 'user1@hotmail.com', '21354548', 'san martin 452', '12345Us#', 'USER'),
(31, 'user11', 'user1', 'user1@hotmail.com', '21354548', 'san martin 452', '12345Us#', 'USER');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail`
--
ALTER TABLE `detail`
  ADD PRIMARY KEY (`ID_order`),
  ADD KEY `orders_ID` (`orders_ID`),
  ADD KEY `product_ID` (`product_ID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID_orders`),
  ADD KEY `user_ID` (`user_ID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID_product`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail`
--
ALTER TABLE `detail`
  MODIFY `ID_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `ID_orders` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail`
--
ALTER TABLE `detail`
  ADD CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`orders_ID`) REFERENCES `orders` (`ID_orders`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_ibfk_2` FOREIGN KEY (`product_ID`) REFERENCES `products` (`ID_product`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `users` (`ID_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

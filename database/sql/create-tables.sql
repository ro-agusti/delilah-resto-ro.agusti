CREATE TABLE `users` (
    `ID_user` int(11) NOT NULL,
    `username` varchar(255) NOT NULL,
    `name & surname` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL, 
    `telephone` varchar(255) NOT NULL,
    `address` varchar(255) NOT NULL,
    `password` varchar(150) NOT NULL,
    `role` enum('USER','ADMIN') NOT NULL 
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE users
  ADD PRIMARY KEY (ID_user);

ALTER TABLE users
  MODIFY ID_user int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users` CHANGE `role` `role` ENUM('USER','ADMIN') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'USER'; 

--------------------------------------------

CREATE TABLE `products` (
    `ID_product` int(11) NOT NULL,
    `product_name` varchar(255) NOT NULL,
    `price` int(100) NOT NULL,
    `image` BLOB(250) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE products
  ADD PRIMARY KEY (ID_product);

ALTER TABLE products
  MODIFY ID_product int(11) NOT NULL AUTO_INCREMENT;

--------------------------------------------

CREATE TABLE `order` (
    `ID_order` int(11) NOT NULL,
    `ID_orders` int(11) NOT NULL,
    `ID_product` int(11) NOT NULL,
    `amount` int(100) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE order
  ADD PRIMARY KEY (ID_order);

ALTER TABLE order
  MODIFY ID_order int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE order
  ADD FOREIGN KEY (ID_product) REFERENCES products(ID_product);

ALTER TABLE order
  ADD FOREIGN KEY (ID_orders) REFERENCES orders(ID_orders);

--------------------------------------------

CREATE TABLE `orders` (
    `ID_orders` int(11) NOT NULL,
    `estate` enum('NUEVO','CONFIRMADO','PREPARANDO','ENVIANDO',
    'ENTREGADO') NOT NULL, 
    `time` TIMESTAMP(6) NOT NULL,
    `payment_type` enum('TARJETA','TRANSFERENCIA','EFECTIVO') NOT NULL, 
    `ID_user` int(11) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE orders
  ADD PRIMARY KEY (ID_orders);

ALTER TABLE orders
  MODIFY ID_orders int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE orders
  ADD FOREIGN KEY (ID_user) REFERENCES users(ID_user);

--------------------------------------------
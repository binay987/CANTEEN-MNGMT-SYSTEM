-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 22, 2023 at 12:38 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Canteen`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE `admin_info` (
  `id` varchar(9) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`id`, `name`, `address`, `phone`, `update_time`) VALUES
('admin', 'Dasharath Kandel', 'Kathmandu', 99898878, '2023-08-22 10:27:01');

-- --------------------------------------------------------

--
-- Table structure for table `customer_info`
--

CREATE TABLE `customer_info` (
  `id` varchar(9) NOT NULL,
  `name` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `batch` smallint(11) NOT NULL,
  `available_balance` mediumint(9) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_info`
--

INSERT INTO `customer_info` (`id`, `name`, `department`, `batch`, `available_balance`, `update_time`) VALUES
('077BEI016', 'Binaya Basnet', 'ECE', 77, 910, '2023-08-22 10:23:57'),
('077BEI017', 'Binit K.C', 'ECE', 77, 850, '2023-08-22 10:24:20');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` varchar(20) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` mediumint(9) NOT NULL,
  `unit` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `item_name`, `image`, `category`, `price`, `unit`) VALUES
('B_01', 'Black Tea', 'blackT.jpg', 'Breakfast', 15, 'per glass'),
('B_02', 'Milk Tea', 'milkT.jpg', 'Breakfast', 20, 'per glass'),
('L_01', 'Parautha', 'parautha.jpg', 'Lunch', 30, 'per piece'),
('S_01', 'Pizza', 'pizza.jpg', 'Snacks', 500, 'per plate'),
('S_02', 'Samosa', 'samosa.jpg', 'Snacks', 15, 'per piece');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_id` int(11) NOT NULL,
  `id` varchar(20) NOT NULL,
  `item_id` varchar(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `update_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_id`, `id`, `item_id`, `quantity`, `total_price`, `update_time`) VALUES
(20, '077BEI016', 'S_01', 2, 1000, '2023-08-21 10:34:15'),
(21, '077BEI016', 'B_02', 3, 60, '2023-08-22 10:34:37'),
(23, '077BEI017', 'L_01', 4, 120, '2023-08-22 10:35:30'),
(24, '077BEI016', 'L_01', 1, 30, '2023-08-22 10:35:47'),
(25, '077BEI017', 'S_02', 2, 30, '2023-08-22 10:36:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(9) NOT NULL,
  `hashed_password` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `hashed_password`, `role`) VALUES
('077BEI016', '$2b$10$RWlBsNE8.5hq8Gr9cxT5lOS1QnGeZTcKTORnYesABj/u5yBxlGV..', 'customer'),
('077BEI017', '$2b$10$ATEhKbJeqsmyH5s3hQG7XObYL4fBlB.Cb/8l69MupkuS46V.wP9US', 'customer'),
('admin', '$2b$10$PrU6EWb8U5HUOOwcVwlgn.XINj5slHhP0QFkGfj01gGhPUtWDgMuO', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_info`
--
ALTER TABLE `customer_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

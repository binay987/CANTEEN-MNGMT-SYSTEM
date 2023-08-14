-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 14, 2023 at 12:19 PM
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
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_info`
--

CREATE TABLE `customer_info` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `batch` int(11) NOT NULL,
  `available_balance` bigint(20) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_info`
--

INSERT INTO `customer_info` (`id`, `name`, `department`, `batch`, `available_balance`, `role`) VALUES
('077BEI011', 'Binit KC', 'ECE', 77, 0, 'customer'),
('077BEI016', 'Binaya Basnet', 'ECE', 77, 100, 'customer'),
('077bei018', 'Dasharath Kandel', 'ECE', 77, 0, 'customer'),
('1111', 'ihkjjh', 'hj', 655, 0, 'customer'),
('123ee', 'Something', 'ECE', 77, 0, 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` varchar(20) NOT NULL,
  `item_name` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `item_name`, `image`, `category`, `price`) VALUES
('b_01', 'Black Tea', 'blackT.jpg', 'Breakfast', 10),
('l_01', 'Parautha', 'parautha.jpg', 'Lunch', 30),
('S_01', 'Pizza', 'pizza.jpg', 'Snacks', 500),
('S_02', 'Samosa', 'samosa.jpg', 'Snacks', 15);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(10) NOT NULL,
  `hashed_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `hashed_password`) VALUES
('077BEI011', '$2b$10$QjElLLirOL2oviHNW0wrpechugMdVQGlkof0ZM/3E8orJSgm1rYae'),
('077BEI016', '$2b$10$oVuwNS.jeS9PdOS45wu1TO.d/xXGBLl4bIADfun64tLOvvrZv05a.'),
('077bei018', '$2b$10$a/RbujHf0OKnUYZvRXzSf.HE9rzEsmULlmdVaioVx8cuUnTE/nUze'),
('1111', '$2b$10$MRBJKN6t2T5WQm.aBkaCIuCNBaj7DAyNP4ibXy1l/KmSGRQrV1QF2'),
('123ee', '$2b$10$sAdz5vOeLJtoyojtS5QHN.Hm7AlF4Nb/SMDDmmH4CpJpVYG9w9wLi');

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

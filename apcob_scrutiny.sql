-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2024 at 05:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apcob_scrutiny`
--

-- --------------------------------------------------------

--
-- Table structure for table `limits`
--

CREATE TABLE `limits` (
  `sno` int(11) NOT NULL,
  `dccb_name` varchar(30) NOT NULL,
  `sao` float(7,2) NOT NULL,
  `asao` float(7,2) NOT NULL,
  `osao` float(7,2) NOT NULL,
  `fresh_sao` float(7,2) NOT NULL,
  `tstamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `limits`
--

INSERT INTO `limits` (`sno`, `dccb_name`, `sao`, `asao`, `osao`, `fresh_sao`, `tstamp`) VALUES
(1, 'Srikakulam', 585.00, 250.00, 600.00, 20.00, '2024-06-23 11:15:12'),
(2, 'Vizianagaram', 265.00, 200.00, 700.00, 20.00, '2024-06-23 11:15:49'),
(3, 'Visakhapatnam', 195.00, 100.00, 200.00, 20.00, '2024-06-23 11:17:25'),
(4, 'Kakinada', 515.00, 300.00, 700.00, 20.00, '2024-06-23 11:17:53'),
(5, 'Eluru', 925.00, 450.00, 500.00, 20.00, '2024-06-23 11:18:12'),
(6, 'Krishna', 830.00, 350.00, 950.00, 20.00, '2024-06-23 11:18:36'),
(7, 'Guntur', 905.00, 300.00, 1000.00, 20.00, '2024-06-23 11:19:04'),
(8, 'Prakasam', 795.00, 300.00, 150.00, 20.00, '2024-06-23 11:19:28'),
(9, 'Nellore', 215.00, 150.00, 550.00, 20.00, '2024-06-23 11:19:48'),
(10, 'Kadapa', 280.00, 200.00, 750.00, 20.00, '2024-06-23 11:20:09'),
(11, 'Kurnool', 550.00, 250.00, 1300.00, 20.00, '2024-06-23 11:20:45'),
(12, 'Anantapur', 465.00, 250.00, 200.00, 20.00, '2024-06-23 11:21:12'),
(13, 'Chittoor', 345.00, 130.00, 400.00, 20.00, '2024-06-23 11:21:42');

-- --------------------------------------------------------

--
-- Table structure for table `reset_date`
--

CREATE TABLE `reset_date` (
  `sno` int(11) NOT NULL,
  `dccb_name` varchar(50) NOT NULL,
  `account_no` text NOT NULL,
  `purpose` text NOT NULL,
  `roi_type` varchar(10) DEFAULT NULL,
  `latest_roi` decimal(7,2) NOT NULL,
  `loan_amount` float NOT NULL,
  `present_date` date NOT NULL,
  `after_91` date DEFAULT NULL,
  `after_181` date DEFAULT NULL,
  `after_271` date DEFAULT NULL,
  `after_361` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `tstamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reset_date`
--

INSERT INTO `reset_date` (`sno`, `dccb_name`, `account_no`, `purpose`, `roi_type`, `latest_roi`, `loan_amount`, `present_date`, `after_91`, `after_181`, `after_271`, `after_361`, `expiry_date`, `tstamp`) VALUES
(1, 'vizianagaram', '110001501832', 'ST Others (AA) (PACS)', 'Floating', 8.72, 9, '2024-05-16', '2024-08-14', '2024-11-12', '2025-02-10', '2025-05-11', '2025-05-16', '2024-05-16 00:01:00'),
(2, 'vizianagaram', '110001525616', 'ST Others (AA) (PACS)', 'Floating', 8.61, 11, '2024-05-31', '2024-08-29', '2024-11-27', '2025-02-25', '2025-05-26', '2025-05-31', '2024-05-31 00:01:00'),
(3, 'vizianagaram', '110001525672', 'ST Others (AA) (DIR)', 'Floating', 9.01, 2, '2024-05-31', '2024-08-29', '2024-11-27', '2025-02-25', '2025-05-26', '2025-05-31', '2024-05-31 00:01:00'),
(4, 'vizianagaram', '110001535001', 'ST Others (AA) (PACS)', 'Floating', 8.60, 8.5, '2024-06-06', '2024-09-04', '2024-12-03', '2025-03-03', '2025-06-01', '2025-06-06', '2024-06-06 00:01:00'),
(5, 'vizianagaram', '110001542542', 'ST Others (AA) (PACS)', 'Floating', 8.59, 5, '2024-06-11', '2024-09-09', '2024-12-08', '2025-03-08', '2025-06-06', '2025-06-11', '2024-06-11 00:01:00'),
(6, 'Srikakulam', '110001549150', 'ASAO', 'Floating', 8.56, 10, '2024-06-14', '2024-09-12', '2024-12-11', '2025-03-11', '2025-06-09', '2025-06-14', '2024-06-14 00:01:00'),
(7, 'Kadapa', '110001549161', 'ST Others (AA) (PACS)', 'Floating', 8.56, 22, '2024-06-14', '2024-09-12', '2024-12-11', '2025-03-11', '2025-06-09', '2025-06-14', '2024-06-14 00:01:00'),
(8, 'vizianagaram', '110001549183', 'BCTT', 'Floating', 8.96, 9.5, '2024-06-14', '2024-09-12', '2024-12-11', '2025-03-11', '2025-06-09', '2025-06-14', '2024-06-14 00:01:00'),
(9, 'Kadapa', '110001549172', 'BCTT', 'Floating', 8.96, 8, '2024-06-14', '2024-09-12', '2024-12-11', '2025-03-11', '2025-06-09', '2025-06-14', '2024-06-14 00:01:00'),
(10, 'vizianagaram', '110001554976', 'BCTT', 'Floating', 9.08, 10, '2024-06-18', '2024-09-16', '2024-12-15', '2025-03-15', '2025-06-13', '2025-06-18', '2024-06-18 00:01:00'),
(11, 'vizianagaram', '110001561111', 'BCTT', 'Floating', 8.96, 10, '2024-06-20', '2024-09-18', '2024-12-17', '2025-03-17', '2025-06-15', '2025-06-20', '2024-06-20 00:01:00'),
(12, 'Kadapa', '110001568638', 'BCTT', 'Floating', 8.95, 43, '2024-06-25', '2024-09-23', '2024-12-22', '2025-03-22', '2025-06-20', '2025-06-25', '2024-06-25 00:01:00'),
(13, 'vizianagaram', '110001571913', 'ST Others (AA) (DIR)', 'Floating', 8.94, 12, '2024-06-26', '2024-09-24', '2024-12-23', '2025-03-23', '2025-06-21', '2025-06-26', '2024-06-26 00:01:00'),
(14, 'vizianagaram', '110001571946', 'ST Others (AA) (PACS)', 'Floating', 8.54, 8, '2024-06-26', '2024-09-24', '2024-12-23', '2025-03-23', '2025-06-21', '2025-06-26', '2024-06-26 00:01:00'),
(15, 'Visakhapatnam', '110001571924', 'BCTT', 'Floating', 8.94, 25, '2024-06-26', '2024-09-24', '2024-12-23', '2025-03-23', '2025-06-21', '2025-06-26', '2024-06-26 00:01:00'),
(16, 'Visakhapatnam', '110001572009', 'ST Others (AA) (PACS)', 'Floating', 8.54, 23, '2024-06-26', '2024-09-24', '2024-12-23', '2025-03-23', '2025-06-21', '2025-06-26', '2024-06-26 00:01:00'),
(17, 'vizianagaram', '110001574313', 'BCTT', 'Floating', 8.95, 10, '2024-06-27', '2024-09-25', '2024-12-24', '2025-03-24', '2025-06-22', '2025-06-27', '2024-06-27 00:01:00'),
(18, 'Srikakulam', '110001577132', 'BCTT', 'Floating', 8.94, 37.5, '2024-06-29', '2024-09-27', '2024-12-26', '2025-03-26', '2025-06-24', '2025-06-29', '2024-06-29 00:01:00'),
(19, 'vizianagaram', '110001577960', 'ST Others (AA) (DIR)', 'Floating', 8.94, 10, '2024-06-29', '2024-09-27', '2024-12-26', '2025-03-26', '2025-06-24', '2025-06-29', '2024-06-29 00:01:00'),
(20, 'vizianagaram', '110001577982', 'ST Others (AA) (PACS)', 'Floating', 8.54, 10, '2024-06-29', '2024-09-27', '2024-12-26', '2025-03-26', '2025-06-24', '2025-06-29', '2024-06-29 00:01:00'),
(21, 'vizianagaram', '110001583413', 'ST Others (AA) (DIR)', 'Floating', 8.94, 17, '2024-07-01', '2024-09-29', '2024-12-28', '2025-03-28', '2025-06-26', '2025-07-01', '2024-07-01 00:01:00'),
(22, 'vizianagaram', '110001583442', 'ST Others (AA) (PACS)', 'Floating', 8.54, 5, '2024-07-01', '2024-09-29', '2024-12-28', '2025-03-28', '2025-06-26', '2025-07-01', '2024-07-01 00:01:00');

-- --------------------------------------------------------

--
-- Table structure for table `roi`
--

CREATE TABLE `roi` (
  `sno` int(11) NOT NULL,
  `sto_fixed` decimal(7,2) NOT NULL,
  `asao_fixed` decimal(7,2) NOT NULL,
  `sto_floating` decimal(7,2) NOT NULL,
  `asao_floating` decimal(7,2) NOT NULL,
  `tstamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `sno` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password_hash` text NOT NULL,
  `tstamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`sno`, `username`, `email`, `password_hash`, `tstamp`) VALUES
(1, 'Lohith_Marneni', 'lohith.marneni@gmail.com', '12', '2024-06-20 16:39:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `limits`
--
ALTER TABLE `limits`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `reset_date`
--
ALTER TABLE `reset_date`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `roi`
--
ALTER TABLE `roi`
  ADD PRIMARY KEY (`sno`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`sno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reset_date`
--
ALTER TABLE `reset_date`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `roi`
--
ALTER TABLE `roi`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

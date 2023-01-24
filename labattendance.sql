-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 24, 2023 at 11:43 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `labattendance`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
CREATE TABLE IF NOT EXISTS `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roomresid` int NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roomresid` (`roomresid`),
  KEY `UserId` (`UserId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `UserId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coursereservation`
--

DROP TABLE IF EXISTS `coursereservation`;
CREATE TABLE IF NOT EXISTS `coursereservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `CourseId` int NOT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CourseId` (`CourseId`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text,
  `Capacity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `Name`, `Description`, `Capacity`) VALUES
(1, 'B5', 'qwerty', 20);

-- --------------------------------------------------------

--
-- Table structure for table `roomreservation`
--

DROP TABLE IF EXISTS `roomreservation`;
CREATE TABLE IF NOT EXISTS `roomreservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `RoomId` int NOT NULL,
  `CourseId` int NOT NULL,
  `Date` date NOT NULL,
  `STime` time NOT NULL,
  `ETime` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `RoomId` (`RoomId`),
  KEY `CourseId` (`CourseId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `MiddleName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `FirstName`, `MiddleName`, `LastName`, `Username`, `Password`, `Role`) VALUES
(44, 'Omar', 'q', 'Ghiye', 'Omar.Ghiye@hotmail.com', '$2a$10$.EB822kfOWwzhVXHqk4cEOTd1Q5D0PyPTsI75Q16UYc0648dxn7D.', 2),
(43, 'Mahmoud', '', 'Issa', 'Mahmoud.issa@hotmail.com', '$2a$10$tItJtOXsGGRd5ZdAnUh.6Odk/OuTkKgOLLt7snzpV6VDqkerShe66', 2),
(40, 'Hussein', 'Ali', 'Aref', 'Hussein.aref.csci@gmail.com', '$2a$10$4cIl.ZkkagDOfxiveZ82KOhVHZpf6z72RY1/jgznBOjk4CoLq2ska', 0),
(41, 'Salah', '', 'Falou', 'Salah.Falou@Hotmail.com', '$2a$10$oKRzt2yY8imOJIFCKZGCt.kf3zYycSsUhvPrCRcY5Rx1pRZMH65MW', 1),
(42, 'Jana', '', 'Khanji', 'Jana.Khanji@hotmail.com', '$2a$10$qJYBn5DYBxfvKdVwQI0HBu1SQ.kG12oLVjb63h9ydkKrz.C.TtEYK', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

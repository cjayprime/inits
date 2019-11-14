-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 14, 2019 at 02:08 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inits`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` tinyint(4) NOT NULL,
  `password` varchar(32) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `emoji` tinytext NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `phone` (`title`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `title`, `emoji`, `date`) VALUES
(3, 'Eventss', 'no_mouth', '2019-11-12 00:00:00'),
(2, 'Restaurants', 'rolling_on_the_floor_laughing', '2019-11-12 00:00:00'),
(5, 'Ert', 'santa', '2019-11-14 13:23:16'),
(8, 'Yh', 'grinning', '2019-11-14 13:54:33');

-- --------------------------------------------------------

--
-- Table structure for table `listing`
--

DROP TABLE IF EXISTS `listing`;
CREATE TABLE IF NOT EXISTS `listing` (
  `listing_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `image` longtext NOT NULL,
  `url` text NOT NULL,
  `email` text NOT NULL,
  `mobile` text NOT NULL,
  `address` text NOT NULL,
  `views` bigint(20) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`listing_id`),
  KEY `FOREIGN_KEY_category_id` (`category_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listing`
--

INSERT INTO `listing` (`listing_id`, `category_id`, `name`, `description`, `image`, `url`, `email`, `mobile`, `address`, `views`, `date`) VALUES
(11, 0, 'na', 'de', '[]', 'ur', 'em', 'mo', 'ad', 0, '2019-11-14 11:10:19'),
(7, 2, 'Food Lounge', 'Eat here whenever your like', '[\"../images/1.jpg\", \"../images/2.jpg\"]', 'www.foodlounge.com', 'nnachijioke@yahoo.com', '08179222327', '12, Abayomi Street', 2, '2019-11-12 00:00:00'),
(8, 2, 'Food Lounge', 'Eat here whenever your like', '[\"../images/1.jpg\", \"../images/2.jpg\"]', 'www.foodlounge.com', 'nnachijioke@yahoo.com', '08179222327', '12, Abayomi Street', 2, '2019-11-12 00:00:00'),
(9, 2, 'Food Lounge', 'Eat here whenever your like', '[\"../images/1.jpg\", \"../images/2.jpg\"]', 'www.foodlounge.com', 'nnachijioke@yahoo.com', '08179222327', '12, Abayomi Street', 2, '2019-11-12 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

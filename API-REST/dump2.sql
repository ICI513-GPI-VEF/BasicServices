-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: basicServices
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `address` varchar(40) NOT NULL,
  `contact` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(16) NOT NULL,
  `id_client` int NOT NULL AUTO_INCREMENT,
  `typeClient` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `clients_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES ('Ana','Pera','Cerro Placeres, psj. Moreno, #0219','984324821','ana.pera@gmail.com','ana2000',1,1,'2024-06-06 22:22:07','2024-06-06 22:22:07'),('Emiliano','Salgado','Viña Centro, Av. Libertad 3421','975671290','emilian.sal@gmail.com','emil2000',2,1,'2024-06-06 22:23:46','2024-06-06 22:23:46'),('Carlos','Meneses','Playa Salinas, #1245','945234124','carlosmen@gmail.com','carlos2000',3,2,'2024-06-06 22:25:35','2024-06-06 22:25:35'),('Pedro','Piedra','Plaza Victoria, Av. Sur, #1617','983324192','pedro.pie@gmail.com','pedro2000',4,1,'2024-06-06 22:26:55','2024-06-06 22:26:55'),('Jaime','Nuñez','Plaza Victoria, Av. Sur, #1617','983324192','jaime.nun@gmail.com','jaime2000',5,1,'2024-06-06 22:28:16','2024-06-06 22:28:16'),('Jose','Molina','Puerto, Av. Errázuriz, #0357','998527612','jose.mol@gmail.com','jose2000',6,2,'2024-06-06 22:29:09','2024-06-06 22:29:09'),('Marcos','Ponce','Francia, Av. Errázuriz, #6357','928727612','marcos.ponce@gmail.com','marcos2000',7,2,'2024-06-06 22:30:11','2024-06-06 22:31:29');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiences`
--

DROP TABLE IF EXISTS `experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiences` (
  `name_work` varchar(20) NOT NULL,
  `description` varchar(300) NOT NULL,
  `horary` varchar(60) NOT NULL,
  `avg_qualification` int unsigned DEFAULT '0',
  `id_experience` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_provider` int NOT NULL,
  PRIMARY KEY (`id_experience`),
  KEY `id_provider` (`id_provider`),
  CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id_provider`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opinions`
--

DROP TABLE IF EXISTS `opinions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opinions` (
  `comment` varchar(500) DEFAULT NULL,
  `qualification` int unsigned NOT NULL,
  `likes` int unsigned DEFAULT '0',
  `id_opinion` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_client` int NOT NULL,
  `id_experience` int NOT NULL,
  PRIMARY KEY (`id_opinion`),
  KEY `id_client` (`id_client`),
  KEY `id_experience` (`id_experience`),
  CONSTRAINT `opinions_ibfk_5` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `opinions_ibfk_6` FOREIGN KEY (`id_experience`) REFERENCES `experiences` (`id_experience`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opinions`
--

LOCK TABLES `opinions` WRITE;
/*!40000 ALTER TABLE `opinions` DISABLE KEYS */;
/*!40000 ALTER TABLE `opinions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `overview` varchar(300) NOT NULL,
  `id_provider` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_client` int NOT NULL,
  PRIMARY KEY (`id_provider`),
  UNIQUE KEY `id_client` (`id_client`),
  CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id_client`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES ('Me dedico a la mantención y limpieza de tuberías',1,'2024-06-06 22:25:35','2024-06-06 22:25:35',3),('Me dedico a la gafitería',2,'2024-06-06 22:29:09','2024-06-06 22:29:09',6),('Me dedico a la reparación y restauración de inmuebles',3,'2024-06-06 22:31:29','2024-06-06 22:31:29',7);
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-06 18:48:28

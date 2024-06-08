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
  `id_client` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_client`),
  UNIQUE KEY `id_user` (`id_user`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'2024-05-06 01:48:26','2024-05-06 01:48:26',1),(2,'2024-05-15 21:23:58','2024-05-15 21:23:58',4),(3,'2024-05-22 17:52:30','2024-05-22 17:52:30',5),(4,'2024-05-22 20:10:51','2024-05-22 20:10:51',7);
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
  `qualification` int unsigned DEFAULT '0',
  `id_experience` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_provider` int NOT NULL,
  PRIMARY KEY (`id_experience`),
  KEY `id_provider` (`id_provider`),
  CONSTRAINT `experiences_ibfk_1` FOREIGN KEY (`id_provider`) REFERENCES `providers` (`id_provider`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiences`
--

LOCK TABLES `experiences` WRITE;
/*!40000 ALTER TABLE `experiences` DISABLE KEYS */;
INSERT INTO `experiences` VALUES 
('gasfiter','Mantención y limpieza de tuberías','Lunes y jueves 10:00 pm - 19:00',0,1,'2024-05-25 04:45:09','2024-05-25 04:45:09',1),
('gasfiter','Arreglos fugas de gas, fugas de agua, limpieza de calefont, mantenciones.','Todos los dias excepto fines de semana, 14:00 pm - 20:00',0,2,'2024-05-25 04:57:12','2024-05-25 04:57:12',2),
('Albañil','Reparación de cimientos, levantamiento de muros, techos, losas, dalas.','Martes a viernes, 8:00 am - 18:00 pm',0,3,'2024-05-25 05:24:31','2024-05-25 05:24:31',3),
('Gasfiter','Instalación y reparación de accesorios del sistema de agua o desagüe','Jueves y Domingos, 8:00 am - 20:00 pm',0,4,'2024-05-25 05:37:34','2024-05-25 05:37:34',3);
/*!40000 ALTER TABLE `experiences` ENABLE KEYS */;
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
  `id_user` int NOT NULL,
  PRIMARY KEY (`id_provider`),
  UNIQUE KEY `id_user` (`id_user`),
  CONSTRAINT `providers_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES 
('Me dedico a la mantención y limpieza de tuberías',1,'2024-05-06 02:34:47','2024-05-06 02:34:47',2),
('Me dedico a la gafitería',2,'2024-05-13 04:13:17','2024-05-13 04:13:17',3),
('Me dedico a la reparación y restauración de inmuebles',3,'2024-05-22 20:06:16','2024-05-22 20:06:16',6);
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `address` varchar(40) NOT NULL,
  `contact` varchar(30) NOT NULL,
  `alias` varchar(10) NOT NULL,
  `password` varchar(16) NOT NULL,
  `id_user` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `users_alias` (`alias`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES 
('Ana','Pera','Cerro Placeres, psj. Moreno, #0219','984324821','anap00','00#angora',1,'2024-05-06 01:45:47','2024-05-06 01:45:47'),
('Emiliano','Salido','Viña Centro, Av. Libertad 3421','975671290','Emiano','emioneword69',2,'2024-05-06 02:30:54','2024-05-06 02:30:54'),
('Carlos','Meneses','Playa Salinas, #1245','945234124','carlman','carls1245',3,'2024-05-13 04:11:08','2024-05-13 04:11:08'),
('Pedro','Piedra','Cerro Placeres, psj. Moreno, #0219','984324822','pepe00','pepo01',4,'2024-05-15 16:55:49','2024-05-15 16:55:49'),
('Jaime','Nuñez','Plaza Victoria, Av. Sur, #1617','983324192','jaimeLoca','jan2000',5,'2024-05-22 17:46:21','2024-05-22 17:46:21'),
('Jose','Molina','Puerto, Av. Errázuriz, #0357','998527612','josemol','molinaj23',6,'2024-05-22 20:04:40','2024-05-22 20:04:40'),
('Marcos','Ponce','Francia, Av. Errázuriz, #6357','928727612','marcoco','maraco23',7,'2024-05-22 20:10:41','2024-05-22 20:10:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-26 22:36:38

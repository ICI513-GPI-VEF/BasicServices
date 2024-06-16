"use client";

import { useState, useEffect } from "react";
import ProfileComp from "../../components/Profile";

const mockData = [
  // Datos ficticios para visualizar en la tabla.
  {
    direccion: "Plaza Belén",
    fecha: "4/10/2023 12:00",
    nombre_operador: "GALVEZ SEPULVEDA CLAUDIO MAURICIO",
    nombre_patrullero: "ROMERO NEIRA MARIO",
    telefono: "912345678",
    nombre_contribuyente: "Nombre Contribuyente",
    motivo_detalle: "AGRESIÓN",
    observaciones: "Observaciones generales", // Opcional
    grupo_delictual: "", // No se necesita
    num_movil: "SP 02",
  }
  // ...otros registros
];

const Profile = () => {
	const [data, setData] = useState([]);
	useEffect(() => {
		// Realiza la solicitud a la API
		fetch("http://localhost:80/user/get")
		.then((response) => response.json())
		.then((complete) => setData(complete))
		.catch((error) => console.error("Error al obtener datos:", error));
	}, []);

	return <ProfileComp data={data}/>;
};

export default Profile;
/* Página Principal del sitio */
"use client";
import { useState } from 'react';
import Singup from "@/components/Singup";

export default function AccountSingup() {
  const handleSubmit = async (e) => {
		//e.preventDefault();
		console.log("handleSubmit Padre");
		fetch("http://localhost:80/reporte/post", {
			method: 'POST',
			headers: { "content-type": "application/json" },
			body: JSON.stringify(formulario),
		})
			.then(response => response.json())
			.then(data => { console.log('Respuesta del servidor:', data); })
			.catch(error => { console.error('Error al realizar la solicitud:', error); });
	};

    const [formulario, setFormulario] = useState({
		name: "",
		las_name: "",
		contact: "",
		address: "hora",
		mail: "",
		password: "",
		observaciones: "",
	});

    return(
        <>
            <Singup formulario={formulario} setFormulario={setFormulario} handleSubmit={handleSubmit}/>
        </>
    )
}
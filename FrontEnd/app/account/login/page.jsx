/* Página Principal del sitio */
"use client";
import { useState } from 'react';
import Login from "@/components/Login";

export default function AccountLogin() {
  	const [usuario, setUsuario] = useState({
		nombre_usuario: "",
		password: ""
	});
	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorMessage('');    

		fetch("http://localhost:80/usuario/login", {
			method: 'POST',
			headers: { "content-type": "application/json" },
			body: JSON.stringify(usuario),
			})
			.then(response => response.json())
			.then(data => {
				if (data.authenticated && !data.isAdmin) {
				router.push("/menu")
				console.log("Redireccionando a la página correspondiente...");
				}else if(data.authenticated && data.isAdmin){
				router.push("/crud")
				}
				else{
				AlertClick();
				}
			})
			.catch(error => { console.error('Error al realizar la solicitud:', error); });
	};

  return(
    <>
        <Login setUsuario={setUsuario} handleSubmit={handleSubmit}/>
    </>
  )
}
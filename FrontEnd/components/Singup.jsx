
"use client";
import { useState} from 'react';
import Link from 'next/link'

export default function Singup( { formulario, setFormulario, handleSubmit } ){
    const [errorMessage, setErrorMessage] = useState('');
    return (
        <>
        <div className='flex justify-center h-full'>
            <div className='w-4/5 md:w-3/5 lg:w-2/5 h-4/6 p-8 flex flex-col justify-center'>
            <h1 className='text-xl md:text-2xl mb-4 font-bold'>Crear Cuenta</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div>
                    <label htmlFor="name" className="block mb-2">Nombre:</label>
                    <input id="name" type="text" className="w-full p-2 rounded-md border border-slate-400"
                        onChange={(e) => setFormulario(usuario => ({ ...usuario, "name": e.target.value }))}
                    />
                </div>

                <div>
                    <label htmlFor="last_name" className="block mb-2">Apellido:</label>
                    <input id="last_name" type="text" className="w-full p-2 rounded-md border border-slate-400"
                        onChange={(e) => setFormulario(usuario => ({ ...usuario, "last_name": e.target.value }))}
                    />
                </div>

                <div>
                    <label htmlFor="contact" className="block mb-2">Celular:</label>
                    <input id="contact" type="text" className="w-full p-2 rounded-md border border-slate-400"
                        onChange={(e) =>  setFormulario(usuario => ({ ...usuario, "contact": e.target.value }))}
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block mb-2">Direccion:</label>
                    <input id="address" type="text" className="w-full p-2 rounded-md border border-slate-400"
                        onChange={(e) =>  setFormulario(usuario => ({ ...usuario, "address": e.target.value }))}
                    />
                </div>

                <div>
                    <label htmlFor="mail" className="block mb-2">Correo:</label>
                    <input id="mail" type="text" className="w-full p-2 rounded-md border border-slate-400"
                        onChange={(e) =>  setFormulario(usuario => ({ ...usuario, "mail": e.target.value }))}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2">Contraseña:</label>
                    <input id="password" type="password" className="w-full p-2 rounded-md border border-slate-400"
                        onChange={(e) =>  setFormulario(usuario => ({ ...usuario, "password": e.target.value }))}
                    />
                </div>

                <div className='flex flex-col sm:flex-row  gap-4 mx-auto'>
                    <button className='w-32 md:w-48 h-10 md:h-12 bg-[#1CBC74] flex items-center justify-center rounded-lg transition transform hover:scale-105 text-white'>
                        Crear Cuenta
                    </button>
                    <Link href="/account/login" className='w-32 md:w-48 h-10 md:h-12 flex items-center justify-center rounded-lg transition transform hover:scale-105 border-b-2 border-white tracking-wide hover:border-black hover:bg-gray-200'>Iniciar Sesión</Link>
                </div>
                </form>
            </div>
        </div>
        </>
  )
}
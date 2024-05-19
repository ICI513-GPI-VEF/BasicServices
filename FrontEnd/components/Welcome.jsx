"use client";
import Image from 'next/image';
import Link from 'next/link'

import img from '@/utils/fondo.webp'
/* import '@/styles/nav.css'; */

export default function Welcome(){
  return (
    <>
    <div className="relative h-96 lg:h-600 flex items-center bg-cover bg-center" style={{ backgroundImage: `url(${img.src})`}}>
      <div className="relative z-10 text-left" style={{ marginLeft: '8vw', width: '70%'}}>
        <h1 className="text-xl md:text-2xl lg:text-4xl mb-4 font-bold">¡Haz tu vida más fácil!</h1>
        <h2 className="text-xs md:text-sm lg:text-xl mb-6">
          Conecta con los expertos que necesitas para una vida más fácil y simplificada.
          <br/>
          ¡Aprovecha ahora y libérate de los problemas cotidianos en tu domicilio!</h2>
        <div className="w-32 md:w-48 h-10 md:h-12 bg-[#1CBC74] flex items-center justify-center rounded-lg">
          <Link className="text-white w-full h-full flex items-center justify-center text-xs md:text-sm lg:text-ms" href="/expert">Busca un experto</Link>
        </div>
      </div>
    </div>
    </>
  )
}
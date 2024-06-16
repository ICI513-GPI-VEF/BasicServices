"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseCircleCheck, faBars } from '@fortawesome/free-solid-svg-icons';

import '@/styles/nav.css';

export default function Navbar(){
  const [open,setOpen] = useState(false);

  return (
    <>
    <div className="sticky top-0 z-10 flex justify-around items-center py-2 h-24 bg-white">
      <div className='flex items-center space-x-2'>
        {/* <FontAwesomeIcon icon={faCross} size='xl'/> */}
        <FontAwesomeIcon icon={faHouseCircleCheck} size='xl'/>
        <h1 className='text-xs sm:text-base font-bold tracking-wide uppercase'>Homes</h1>
      </div>
      <div className="hidden md:flex gap-4 text-sm">
        <Link className='navLink' href="/">Inicio</Link>
        <Link className='navLink' href="/about">Sobre nosotros</Link>
        <Link className='navLink' href="/services">Servicios</Link>
        <Link className='navLink' href="/contact">Contacto</Link>
      </div>
      <div className='flex gap-6'>
        <Link className='navLink text-ml sm:text-base' href="/account/login">Cuenta</Link>
        <div className='md:hidden flex items-center'>
          <FontAwesomeIcon onClick={()=>setOpen(!open)} icon={faBars} size='xl'/>
        </div>
      </div>
    </div>
    {open && (
      <div className=" fixed inset-x-0 top-25 mx-8 flex flex-col items-center rounded-b-lg border-b-2 border-gray-600 bg-white z-10 text-black md:hidden">
        <section className=" my-8 flex flex-col items-center gap-2 ">
          <div className='navDrop'> 
            <Link href="/">Inicio</Link>
          </div>
          <div className='navDrop'> 
            <Link href="/about">Sobre nosotros</Link>  
          </div>
          <div className='navDrop'> 
            <Link href="/services">Servicios</Link>  
          </div>
          <div className='navDrop'> 
            <Link href="/contact">Contacto</Link>  
          </div>
        </section>
      </div>
    )}
    </>
  )
}
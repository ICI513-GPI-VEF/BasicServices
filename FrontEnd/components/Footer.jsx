"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseCircleCheck, faBars } from '@fortawesome/free-solid-svg-icons';
/* #262626 */

export default function Footer(){

  return (
    <>
      <footer class="bg-[#262626] text-white py-6 px-4">
        <div class="container mx-auto flex flex-wrap justify-between">
          <div className='flex items-center space-x-2'>
            <FontAwesomeIcon icon={faHouseCircleCheck} size='xl'/>
            <h1 className='text-xs sm:text-base font-bold tracking-wide uppercase'>Homes</h1>
          </div>
          <div class="flex items-center">
            <a href="/contact" class="text-sm hover:text-c-green">¿NECESITAS AYUDA?</a>
            {/* <a href="#" class="ml-4 text-sm hover:text-c-green">Contáctanos</a>
            <a href="#" class="ml-4 text-sm hover:text-c-green">Política de privacidad</a> */}
          </div>
        </div>
        <div class="text-center mt-4">
          <p>&copy; 2024 HOMES. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
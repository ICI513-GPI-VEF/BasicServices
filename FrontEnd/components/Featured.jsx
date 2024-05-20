"use client";
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import img1 from '@/utils/p1.png';
import img2 from '@/utils/p2.png';
import img3 from '@/utils/p3.png';


export default function Featured(){
  const steps = [1, 2, 3];
  const names = ["Gabriela Rodríguez", "Alejandro Morales", "Luis Martínez"];
  const occupation = ["Plomera", "Cerrajero", "Chef"];
  const stars = [5, 5, 4];
  /* const imgs = ["utils/p1.png", "../utils/p1.png, '@/utils/p1.png'] */
  const imgs = [img1, img2, img3];
  return (
    <>
    <div className='bg-c-gray'>
    <section className='container mx-auto px-6 md:px-4 py-12 bg-c-gray'>
      <div className="flex justify-center p-6 md:p-4">
        <h1 className="text-xl md:text-2xl lg:text-4xl mb-4 font-bold text-white uppercase">¡Profesionales más destacados!</h1>
      </div>  
      <div className="flex flex-wrap">

        {steps.map((step, index) => (
          <div key={index} className="w-full lg:w-1/3">
            <div className="rounded-lg px-4 pb-2 md:pb-6 w-92 flex items-center justify-center">


              <div className="w-auto xl:w-2/5 flex flex-col items-center justify-center pb-6 md:pb-0">
                <div className="flex justify-center content-center">
                  <div className="w-64 h-64 rounded-full bg-c-green bg-cover bg-center" style={{ backgroundImage: `url(${imgs[index].src})`}}></div>
                </div>
                <div className='inline-flex w-auto text-white pt-4 pb-2'>{names[index]}</div>
                <div className='text-white'>{occupation[index]}</div>
                <div className="flex flex-row pt-4">
                  {/* <FontAwesomeIcon icon={faStar} size='2x' /> */}
                  {Array.from({ length: stars[index] }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} size='2x' color='#FFCE38'/>
                  ))}
                </div>
              </div>


            </div>
          </div>
        ))}

      </div>
      <div className="flex justify-center space-x-4 mt-4 md:mt-8">
        <h1 className="text-ms my-auto md:text-lg lg:text-xl text-white">¿Deseas ofrecer tus servicios?</h1>
        <div className="w-32 md:w-48 h-10 md:h-12 bg-[#1CBC74] flex items-center justify-center rounded-lg">
          <Link className="text-white w-full h-full flex items-center justify-center text-xs md:text-sm lg:text-ms" href="/account">Comienza aquí</Link>
        </div>
      </div>
    </section>
    </div>
  </>
  )
}
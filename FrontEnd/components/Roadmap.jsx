"use client";
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faMagnifyingGlass, faComments, faCheckDouble} from '@fortawesome/free-solid-svg-icons';

import img from '@/utils/lupa.png'

export default function Roadmap(){
  const steps = [1, 2, 3, 4];
  const icons = [faUserCheck, faMagnifyingGlass, faComments, faCheckDouble];
  const texts = ["¡Crea tu perfil!", "Filtra y busca", "Contacta", "Reserva y listo"]
  const customColors = ['#826B54', '#A58565', '#CEA57C', '#E9BA8B']
  const customColorsBG = ['bg-[#826B54]', 'bg-[#A58565]', 'bg-[#CEA57C]', 'bg-[#E9BA8B]'];
  return (
    <>
      <section className='container mx-auto pb-10 p-6 md:p-4'>
        <div className='pt-8 pb-8'>
          <h1 className='text-c-gray text-ms md:text-xl lg:text-2xl font-bold'>Pasos a seguir</h1>
        </div>
        <div className="flex flex-wrap">

          {steps.map((step, index) => (
            <div key={index} className="w-full md:w-1/2 xl:w-1/4">
              <div className="bg-white rounded-lg px-4 pb-2 md:pb-6">
                <div className="flex items-center justify-center">
                  <div className={`flex items-center justify-center w-32 h-32 ${customColorsBG[index % customColorsBG.length]} rounded-full`}/>
                </div>
                <div className={`w-full h-20 ${customColorsBG[index % customColorsBG.length]} -translate-y-4 flex items-center justify-center rounded-lg`}>
                  <div className='absolute flex items-center justify-center w-32 h-32 bg-white -translate-y-24 rounded-full'>
                    <FontAwesomeIcon icon={icons[index % icons.length]} color={customColors[index % customColors.length]} size='2xl'/>
                  </div>
                  <div className="flex flex-wrap items-center">
                    <div className='flex justify-center items-center absolute left-4 w-12 h-12 bg-white rounded-full text-c-gray'> {index+1}</div>
                    <h2 className='text-white'>{texts[index % texts.length]}</h2>
                  </div>
                </div>
                <div className="flex h-auto w-full">
                  <div className={`h-auto w-2 ${customColorsBG[index % customColorsBG.length]}`}></div>
                  <div className="flex-grow p-2 h-full w-full">
                    <h1 className='text-c-gray text-ms md:text-lg'>Crea tu perfil con tus detalles para que los profesionales sepan con quien hablan.</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>
    </>
  )
}
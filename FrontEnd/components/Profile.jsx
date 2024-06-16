"use client";
import Link from 'next/link'

import img from '@/utils/p3.png';

export default function Profile({ data }){

    return (
        <>
            <div className='h-screen flex justify-center'>
                <div className='w-5/6 h-auto pt-2'>
                    <div className='flex flex-wrap justify-center items-center'>
                        <div className="w-full lg:w-1/3">
                        <div className="flex justify-center">
                            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-c-green bg-cover bg-center" style={{ backgroundImage: `url(${img.src})`}}></div>
                        </div>
                        </div>
                        <div className="w-full lg:w-2/3 flex flex-col items-center p-4">
                            <div className='mb-8'>
                                <h1 className='text-xl md:text-2xl lg:text-4xl font-bold'>Luis Martínez</h1>
                            </div>
                            <div className='flex justify-around w-full'>
                                <div className='flex flex-col justify-center items-center'>
                                    <h2 className='m-2 md:text-xl'>Contacto</h2>
                                    <h2 className='md:text-xl'>+569 12345678</h2>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <h2 className='m-2 md:text-xl'>Correo</h2>
                                    <h2 className='md:text-xl'>user.profesional@homes.cl</h2>
                                </div>
                            </div>
                            <div className='my-8 w-full flex flex-col justify-center items-center'>
                                <div className='text-lg md:text-lg lg:text-xl font-bold'>HORARIOS</div>
                                <div className='flex flex-wrap justify-around w-full'>
                                    <div className='flex flex-col justify-center items-center m-2'>
                                        <h2 className='m-2 md:text-lg'>Lunes</h2>
                                        <h2 className='md:text-lg'>10:00 - 17:00</h2>
                                    </div>
                                    <div className='flex flex-col justify-center items-center m-2'>
                                        <h2 className='m-2 md:text-lg'>Martes</h2>
                                        <h2 className='md:text-lg'>09:00 - 17:00</h2>
                                    </div>
                                    <div className='flex flex-col justify-center items-center m-2'>
                                        <h2 className='m-2 md:text-lg'>Miercoles</h2>
                                        <h2 className='md:text-lg'>08:00 - 15:00</h2>
                                    </div>
                                    <div className='flex flex-col justify-center items-center m-2'>
                                        <h2 className='m-2 md:text-lg'>Jueves</h2>
                                        <h2 className='md:text-lg'>09:00 - 17:00</h2>
                                    </div>
                                    <div className='flex flex-col justify-center items-center m-2'>
                                        <h2 className='m-2 md:text-lg'>Viernes</h2>
                                        <h2 className='md:text-lg'>08:00 - 14:00</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
"use client";

import React, { useState } from 'react';
import Profesional from '../../components/profesional';
import Search from '../../components/Search';
import styles from '../../styles/page.css';
const profesionalesData = [
  {
    imagen: '/utils/p1.png',
    nombre: 'Gabriela Rodríguez',
    profesion: 'Plomera'
  },
  {
    imagen: '/utils/p2.png',
    nombre: 'Alejandro Morales',
    profesion: 'Cerrajero'
  },
  {
    imagen: '/utils/p3.png',
    nombre: 'Luis Martínez',
    profesion: 'Chef'
  }
];

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterTerm(event.target.value);
  };

  const filteredProfesionales = profesionalesData.filter((prof) => {
    return (
      prof.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterTerm === '' || prof.profesion === filterTerm)
    );
  });

  return (
    <div>
      <Search
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
      />
      <div className={styles.catalogo}>
        {filteredProfesionales.map((prof, index) => (
          <Profesional
            key={index}
            imagen={prof.imagen}
            nombre={prof.nombre}
            profesion={prof.profesion}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;


import React from 'react';
import styles from '../styles/profesional.module.css';

const Profesional = ({ imagen, nombre, profesion }) => {
  return (
    <div className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.imagen} />
      <div className={styles.info}>
        <h2>{nombre}</h2>
        <p>{profesion}</p>
      </div>
    </div>
  );
};

export default Profesional;

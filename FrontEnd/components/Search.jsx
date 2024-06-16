import React from 'react';

const Search = ({ searchTerm, handleSearch, handleFilter }) => (
  <div>
    <input
      type="text"
      placeholder="Buscar por nombre"
      value={searchTerm}
      onChange={handleSearch}
    />
    <select onChange={handleFilter}>
      <option value="">Todos</option>
      <option value="Plomera">Plomera</option>
      <option value="Cerrajero">Cerrajero</option>
      <option value="Chef">Chef</option>
    </select>
  </div>
);

export default Search;

import React, { useState } from 'react';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import style from "../Home/Home.module.css";

const Home = () => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className={style.home}>
      {/* Agrega el SearchBar */}
      <input
        type="text"
        placeholder="Search by country name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={style.searchBar}
      />

      {/* Pasar el input de búsqueda como prop al componente CardsContainer */}
      <CardsContainer searchInput={searchInput} />
    </div>
  );
};

export default Home;

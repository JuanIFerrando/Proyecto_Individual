import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, flagImage, continent, filteredCountryInfo }) => {
  const isLongName = name.length > 20;

  return (
    <div className={style.card}>
      <Link to={`/detail/${id}`}>
        <img src={flagImage} alt={`Flag of ${name}`} />
        <div className={style.textContainer}>
          <p className={style.longText}>Name: {name}</p>
          <p className={style.longText}>Continent: {continent}</p>
        </div>
      </Link>
      {filteredCountryInfo && (
        <ul>
          {Object.entries(filteredCountryInfo).map(([countryName, countryInfo]) => (
            <li key={countryName}>
              <img src={countryInfo.flagImage} alt={`Flag of ${countryName}`} />
              {countryInfo.name} - {countryInfo.continent}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;





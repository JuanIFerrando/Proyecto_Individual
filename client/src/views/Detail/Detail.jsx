import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams(); // Obtener el ID del país desde la URL
  const [country, setCountry] = useState(null);

  useEffect(() => {
    // Realizar la solicitud al backend para obtener los detalles del país
    axios.get(`http://localhost:3001/countries/${id}`)
      .then((response) => {
        setCountry(response.data);
      })
      .catch((error) => {
        console.error("Error fetching country details:", error);
      });
  }, [id]); // Ejecutar el efecto solo cuando cambie el ID del país

  if (!country) {
    return <div>Loading...</div>; // Muestra un mensaje de carga mientras se obtienen los datos del país
  }

  return (
    <div>
      <h1>Country Details</h1>
      <p>ID: {country.id}</p>
      <p>Name: {country.name}</p>
      <img src={country.flagImage} alt={`Flag of ${country.name}`} />
      <p>Continent: {country.continent}</p>
      <p>Capital: {country.capital}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>
    </div>
  );
};

export default Detail;

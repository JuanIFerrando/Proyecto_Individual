import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../Form/Form.module.css"

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [], // Seleccionar/agregar países en simultáneo
  });

  const [countries, setCountries] = useState([]); // Estado para almacenar los países disponibles
  const [selectedCountries, setSelectedCountries] = useState([]); // Estado para los países seleccionados

  useEffect(() => {
    // Cargar países disponibles al montar el componente
    axios.get("http://localhost:3001/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const [errors, setErrors] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });

    validate({ ...form, [property]: value });
  };

  const handleCountriesChange = (event) => {
    const selectedCountryIds = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedCountries(selectedCountryIds); // Reemplazamos los países seleccionados con los nuevos
  };

  const validate = (form) => {
    const newErrors = {};
  
    // Validación de nombre: no debe contener números ni caracteres especiales
    if (!/^[a-zA-Z\s]*$/.test(form.name)) {
      newErrors.name = "El nombre solo debe contener letras y espacios";
    }
  
    // Validación de dificultad: debe ser un número entre 1 y 5
    if (!/^[1-5]$/.test(form.difficulty)) {
      newErrors.difficulty = "La dificultad debe ser un número entre 1 y 5";
    }
  
    // Validación de duración: debe ser un número positivo y menor a 24
    if (!/^\d+(\.\d+)?$/.test(form.duration) || parseFloat(form.duration) <= 0 || parseFloat(form.duration) >= 24) {
      newErrors.duration = "La duración debe ser un número positivo y menor a 24";
    }
  
    // Validación de temporada: debe ser una de las opciones válidas
    const validSeasons = ["Summer", "Autumn", "Winter", "Spring"];
    if (!validSeasons.includes(form.season)) {
      newErrors.season = "Temporada inválida, las opciones son: Summer, Autumn, Winter, Spring";
    }
  
    setErrors(newErrors);
  };
  

  const submitHandler = (event) => {
    event.preventDefault();
  
    const formData = {
      name: form.name,
      difficulty: parseInt(form.difficulty),
      duration: parseFloat(form.duration),
      season: form.season,
      countryId: selectedCountries, // Enviar los IDs de los países seleccionados
    };
  
    axios
      .post("http://localhost:3001/activities", formData)
      .then((res) => alert("Activity created successfully"))
      .catch((err) => alert("Error creating activity"));
  };
  

  return (
    <div className={style.formBackground}>
      <form className={style.formContainer} onSubmit={submitHandler}>
        <div className={style.formGroup}>
          <label>Name: </label>
          <input
            type="text"
            value={form.name}
            onChange={changeHandler}
            name="name"
            className={errors.name ? style.errorInput : ""}
          />
          {errors.name && <span className={style.errorText}>{errors.name}</span>}
        </div>

        <div className={style.formGroup}>
          <label>Difficulty: </label>
          <input
            type="text"
            value={form.difficulty}
            onChange={changeHandler}
            name="difficulty"
            className={errors.difficulty ? style.errorInput : ""}
          />
          {errors.difficulty && <span className={style.errorText}>{errors.difficulty}</span>}
        </div>

        <div className={style.formGroup}>
          <label>Duration: </label>
          <input
            type="text"
            value={form.duration}
            onChange={changeHandler}
            name="duration"
            className={errors.duration ? style.errorInput : ""}
          />
          {errors.duration && <span className={style.errorText}>{errors.duration}</span>}
        </div>

        <div className={style.formGroup}>
          <label>Season: </label>
          <input
            type="text"
            value={form.season}
            onChange={changeHandler}
            name="season"
            className={errors.season ? style.errorInput : ""}
          />
          {errors.season && <span className={style.errorText}>{errors.season}</span>}
        </div>

        <div className={style.formGroup}>
          <label>Countries: </label>
          <select
            multiple
            value={selectedCountries}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
              setSelectedCountries([...selectedCountries, ...selectedOptions]); // Agregamos las nuevas selecciones a las anteriores
            }}
            name="countries"
            className={errors.countries ? style.errorInput : ""}
          >
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.countries && <span className={style.errorText}>{errors.countries}</span>}
        </div>

        <div className={style.formGroup}>
          <p>Selected Countries:</p>
          <ul>
            {selectedCountries.map((countryId) => {
              const selectedCountry = countries.find((country) => country.id === countryId);
              return <li key={countryId}>{selectedCountry.name}</li>;
            })}
          </ul>
        </div>


        <button type="submit">CREATE ACTIVITY</button>

      </form>
    </div>
  );
};

export default Form;

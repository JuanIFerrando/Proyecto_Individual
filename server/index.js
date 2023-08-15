// index.js
const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require("./src/db.js");
const PORT = 3001;

// Función para cargar los países desde la API externa y guardarlos en la base de datos
async function loadCountriesFromAPI() {
  try {
    const dataBase = await Country.findAll();

    // Carga los países desde la API externa y los guarda en la base de datos
    if (!dataBase.length) {
      const { data } = await axios("http://localhost:5000/countries");

      const mappedData = data.map((country) => {
        return {
          id: country.cca3,
          name: country.name.common,
          flagImage: country.flags.svg,
          continent: country.continents.join(" - "),
          capital: country.capital
            ? country.capital.join(" - ")
            : "No Capital Found",
          subregion: country.subregion
            ? country.subregion
            : "No Subregion Found",
          area: country.area,
          population: country.population,
        };
      });

      // Crea los registros de los países en la base de datos
      await Country.bulkCreate(mappedData);

      console.log("Countries loaded");
    }
  } catch (error) {
    console.error("Error loading countries:", error);
  }
}

// Llamamos a la función de carga de países y luego ponemos a escuchar el servidor
conn
  .sync({ force: false }) // el force en true, reinicia la bs al volver a levantar el servidor
  .then(async () => {
    await loadCountriesFromAPI();
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

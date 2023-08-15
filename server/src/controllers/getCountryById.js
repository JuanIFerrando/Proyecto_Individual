const { Country, Activity } = require("../db");

//Recibe un id de 3 letras y busca la unica coincidencia por PK
const getCountryById = async (req, res) => {
  try {
    const { idPais } = req.params;

    const CountryFound = await Country.findByPk(idPais, {
      include: [Activity],
    });
    if (CountryFound) {
      return res.status(200).json(CountryFound);
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(404).json({ error: "ID Not Found" });
  }
};

module.exports = getCountryById;

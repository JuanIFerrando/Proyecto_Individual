const { Country } = require("../db");
const { Op } = require("sequelize");

const getCountriesByName = async (req, res) => {
  const { name } = req.query;

  try {
    const countriesFound = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
    if (countriesFound) {
      return res.status(200).json(countriesFound);
    } else {
      throw Error;
    }
  } catch (error) {
    res.status(404).json({ error: `No countries with the name ${name}` });
  }
};

module.exports = getCountriesByName;

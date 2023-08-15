const { Router } = require("express");

const countriesRoutes = Router();

const getAllCountries = require("../controllers/getAllCountries");
const getCountryById = require("../controllers/getCountryById");
const getCountryByName = require("../controllers/getCountryByName");

countriesRoutes.get("/", getAllCountries);

countriesRoutes.get("/name", getCountryByName);

countriesRoutes.get("/:idPais", getCountryById);

module.exports = countriesRoutes;

const { Router } = require("express");

const mainRoutes = Router();

const countriesRoutes = require("./countriesRoutes");
const activitiesRoutes = require("./activitiesRoutes");
const {
  getCountriesByActivities,
} = require("../controllers/getCountriesByActivities");

mainRoutes.use("/countries", countriesRoutes);
mainRoutes.use("/activities", activitiesRoutes);
mainRoutes.get("/countries-by-activities", getCountriesByActivities);

module.exports = mainRoutes;

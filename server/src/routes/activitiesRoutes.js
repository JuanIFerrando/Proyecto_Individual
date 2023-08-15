const { Router } = require("express");

const activitiesRoutes = Router();

const postActivity = require("../controllers/postActivity");
const getActivities = require("../controllers/getActivities");

activitiesRoutes.get("/", getActivities);

activitiesRoutes.post("/", postActivity);

module.exports = activitiesRoutes;

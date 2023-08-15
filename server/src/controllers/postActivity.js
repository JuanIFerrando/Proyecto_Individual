const { Activity } = require("../db");

const postActivity = async (req, res) => {
  const { countryId, name, difficulty, duration, season } = req.body;
  try {
    if (countryId.length === 0 || !name || !difficulty || !season) {
      return res.status(404).json({ error: "Missing data to add activity" });
    }

    const newActivity = await Activity.create({
      name,
      difficulty,
      season,
      duration: duration !== "" ? duration : null,
    });

    await newActivity.addCountries(countryId);

    return res.status(200).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = postActivity;

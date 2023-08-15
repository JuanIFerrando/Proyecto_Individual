const { Country, Activity } = require("../db");

const getCountriesByActivities = async (req, res) => {
  try {
    const { id } = req.query;
    if (id === "All countries") {
      return res.status(200).send("All countries");
    }

    const activity = await Activity.findByPk(id, {
      include: [Country],
    });
    if (activity) return res.status(200).json(activity.Countries);
    else throw Error;
  } catch (error) {
    res.status(404).json({ error: "No Countries Found" });
  }
};

module.exports = { getCountriesByActivities };

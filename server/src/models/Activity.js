const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z\s]*$/, // Validar que el nombre no contenga números ni caracteres especiales
        },
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          // {min:1, max:5},
          isIn: [[1, 2, 3, 4, 5]], //PREGUNTAR A GPT EXPLICACION
        },
      },
      duration: {
        type: DataTypes.FLOAT,
        validate: {
          max: 24, // Validar que la duración no exeda el limite de horas
        },
      },
      season: {
        type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

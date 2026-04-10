const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sql");
const validator = require("validator");

const Agent = sequelize.define(
  "Agent",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true, 
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password_hash:{
      type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
              isStrong(value) {
                if (!validator.isStrongPassword(value)) {
                  throw new Error("Password must be strong");
                }
              },
            },
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true, // Set to true if some agents don't have a specific zone
    },
    availability_status: {
      type: DataTypes.ENUM("available", "busy", "offline"),
      allowNull: false,
      defaultValue: "available",
    },
    active_shipments_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1), 
      allowNull: false,
      defaultValue: 5.0,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    otp_hash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "agents",
    timestamps: true, 
  },
);

module.exports = Agent;
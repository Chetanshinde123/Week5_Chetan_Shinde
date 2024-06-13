"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    username: "postgres",
    host: "localhost",
    database: "Shift",
    password: "Shinde@225",
    port: 5432,
    dialect: "postgres"
});
sequelize
    .authenticate()
    .then(() => {
    console.log("Database Connected");
})
    .catch((err) => {
    console.log("Error connecting data", err);
});
sequelize
    .sync({ force: true })
    .then(() => {
    console.log("Database synchronized");
})
    .catch((error) => {
    console.error("Unable to synchronize the database:", error.message);
    console.error(error.stack);
});
exports.default = sequelize;

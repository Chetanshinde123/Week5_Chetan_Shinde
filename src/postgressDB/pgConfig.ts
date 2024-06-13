import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
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

export default sequelize;

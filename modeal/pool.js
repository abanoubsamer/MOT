const { Client } = require('pg'); // Import Client from pg module
require("dotenv").config();

const database = process.env.DATABASE_URL;
const dbClient = new Client(database); // Use a different variable name

dbClient.connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(err => {
    console.error("Error connecting to the database:", err);
  });

module.exports = dbClient;

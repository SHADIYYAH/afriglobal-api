require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const DATABASE_PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME;
const displayRoutes = require("express-routemap");
const userRoute = require("./routes/user");
const db = require("./config/database");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/user", userRoute);

mongoose
  .connect(`${DB_URI}`)
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(PORT, async () => {
      console.log(`... listening on ${PORT}`);
      await db.connect().then((res) => console.log("res"));
      displayRoutes(app);
    });
  })
  .catch((err) => console.log("Error: " + err));

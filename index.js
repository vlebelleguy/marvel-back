const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

app.get("/characters", async (req, res) => {
  try {
try {
      let limit = 100;
      if (req.query.limit) {
         limit = Number(req.query.limit);
      }

      let skip = 0;
      if (req.query.skip) {
         skip = Number(req.query.skip);
      }

      let name = "";
      if (req.query.name) {
         name = req.query.name;
      }

      const response = await axios.get(
         `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&name=${name}`
      );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: "🚫 You are not authorized to access this area." });
});

app.listen(process.env.PORT, () => {
  console.log("🤖 J.A.R.V.I.S. has started the server.");
});

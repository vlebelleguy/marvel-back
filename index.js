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
    // Requête à l'API Marvel pour obtenir une liste de comics
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    // if (req.query.limit) {
    //   limit = req.query.limit;
    // } else {
    //   limit = 100;
    // }
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

app.get("/comics", async (req, res) => {
  try {
    // Requête à l'API Marvel pour obtenir une liste de comics
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    // if (req.query.limit) {
    //   limit = req.query.limit;
    // } else {
    //   limit = 100;
    // }
    let title = "";
      if (req.query.title) {
         title = req.query.title;
      }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "🦸‍♂️ Welcome to the Marvel API by Valentin!" });
});

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: "🚫 You are not authorized to access this area." });
});

app.listen(process.env.PORT, () => {
  console.log("🤖 J.A.R.V.I.S. has started the server.");
});

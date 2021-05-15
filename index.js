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
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// app.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ message: "🦸‍♂️ Welcome to the Marvel API by Valentin!" });
// });

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: "🚫 You are not authorized to access this area." });
});

app.listen(process.env.PORT, () => {
  console.log("🤖 J.A.R.V.I.S. has started the server.");
});

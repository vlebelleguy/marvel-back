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

      res.status(200).json(response.data);
   } catch (error) {
      console.log(error);
   }
});

app.get("/comics", async (req, res) => {
   try {
      let limit = 100;
      if (req.query.limit) {
         limit = Number(req.query.limit);
      }

      let skip = 0;
      if (req.query.skip) {
         skip = Number(req.query.skip);
      }

      let title = "";
      if (req.query.title) {
         title = req.query.title;
      }

      const response = await axios.get(
         `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
      );
      res.status(200).json(response.data);
   } catch (error) {
      console.log(error);
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

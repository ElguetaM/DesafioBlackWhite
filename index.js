import express from "express";
import { v4 as uuidv4 } from "uuid";
import Jimp from "jimp";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.use(express.static("assets"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/load", async (req, res) => {
  try {
    const id = uuidv4().slice(30);
    const { image } = req.query;
    const imagen = await Jimp.read(image);
    const newImage = `${id}.jpg`;
    await imagen
      .resize(350, Jimp.AUTO)
      .greyscale()
      .writeAsync(`assets/img/${newImage}`);
    res.sendFile(path.join(__dirname, `assets/img/${newImage}`));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

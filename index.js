import express from "express";
import { v4 as uuidv4 } from "uuid";
import Jimp from "jimp";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = import.meta.dirname;

app.use(express.static("assets"));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
  const id = uuidv4().slice(30);
  const { image } = req.query;
  const imagen = await Jimp.read(image);
  await imagen
    .resize(350, Jimp.AUTO)
    .greyscale()
    .writeAsync(`assets/img/${id}.jpg`);
  const newImage = fs.readFileSync(`${id}.jpg`);
  res.send(newImage);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "view/404.html"));
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

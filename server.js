import express from "express";
import "dotenv/config";

import { getPrice } from "./src/services/service.js";
import { toResponse } from ".src/mappers/responseMapper.js";

const app = express();
const port = process.env.PORT;

app.get("/", async (_, res) => {
  try {
    const priceData = await getPrice();
    const resp = toResponse(priceData);
    res.status(200).send(resp);
  } catch (error) {
    console.log({ error });
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log(`Starting on ${port}`));

import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.get("/", (_, res) => {
  const response = {
    frames: [
      {
        text: "10 kr/kwh",
        icon: 16484,
      },
      {
        text: "+10%",
        icon: 120,
      },
    ],
  };

  res.status(200).send(response);
});
app.listen(port, () => console.log(`Starting on ${port}`));

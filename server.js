import express from "express";

const app = express();
const port = 5100;

app.get("/", (req, res) => {
  res.send("hello there");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

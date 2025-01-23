import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the ALL engine API!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

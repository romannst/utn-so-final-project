const express = require("express");
const db = require("./db");

// Define express app
const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.get("/greet", (req, res) => {
  if (!req.query.name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }
  const name = req.query.name;
  res.json({ message: `¡Hola, ${name}!` });
});
//students
app.get("/students", (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }
  db.query("INSERT INTO students (name) VALUES ($1) RETURNING *", [name])
    .then(result => res.json(result.rows[0]))
    .catch(err => {
      console.error(err);
      res.status(500).send("DB error");
    });
});
app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));

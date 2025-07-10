const express = require("express");
const db = require("./db");

// Define express app
const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.get("/api/greet", (req, res) => {
  const name = req.query.name || "World";
  res.json({ message: `¡Hola, ${name}!` });
});
app.post("/students", async (req, res) => {
  const { name } = req.body;
  const result = await db.query("INSERT INTO students (name) VALUES ($1) RETURNING *", [name]);
  res.json(result.rows[0]);
});
//students
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

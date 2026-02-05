// configure Express
const express = require("express");
const notesRoutes = require("./routes/notes-routes");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/notes", notesRoutes);

// Error handling
app.use(errorMiddleware);

module.exports = app;

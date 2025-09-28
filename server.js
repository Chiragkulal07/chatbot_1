// index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");




const app = express();
const PORT =  5000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
require('dotenv').config();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.render("index");
});

const analysisRoutes = require('./routes/analysisroute');
const methodsRoutes = require('./routes/methodroute');
const insightsRoutes = require('./routes/insightroute');


app.use('/analysis', analysisRoutes);
app.use('/methods', methodsRoutes);
app.use('/insights', insightsRoutes);


app.get('/api/test', (req, res) => {
  res.json({ message: "API is working" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

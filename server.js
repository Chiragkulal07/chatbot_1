const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = 5000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const analysisRoutes = require('./routes/analysisroute');
const methodsRoutes = require('./routes/methodroute');
const insightsRoutes = require('./routes/insightroute');

app.use('/analysis', analysisRoutes);
app.use('/methods', methodsRoutes);
app.use('/insights', insightsRoutes);

app.get('/', (req, res) => res.render('index'));
app.get('/api/test', (req, res) => res.json({ message: "API is working" }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

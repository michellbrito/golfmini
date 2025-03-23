const express = require('express');
const routes = require('./routes');
const { rateLimit } = require('express-rate-limit');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter)
app.use(cors({
    origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
    methods: ['GET'],
    credentials: true
}));
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
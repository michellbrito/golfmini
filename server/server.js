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
    skip: (req) => {
        const ua = req.headers['user-agent'] || '';
        return /googlebot|feedfetcher-google|google-read-aloud|google-site-verification/i.test(ua);
    },
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter)
app.use(cors({
    origin: ['https://www.golfmini.com', 'https://golfmini.com', 'http://www.golfmini.com', 'http://golfmini.com', 'http://localhost:3000'],
    methods: ['GET'],
    credentials: true
}));
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
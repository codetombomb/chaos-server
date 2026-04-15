const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}));

const port = process.env.PORT || 3001;

app.get('/top-five', (req, res) => {
    console.log("Received request for top five scores.")
    const games = [
        {
            username: "Tom",
            score: 10,
            time: "02:15",
            tpCollected: 8,
            sanitizerCollected: 5
        },
        {

            username: "Mario",
            score: 11,
            time: "01:48",
            tpCollected: 6,
            sanitizerCollected: 4
        },
        {

            username: "Mario",
            score: 12,
            time: "01:48",
            tpCollected: 6,
            sanitizerCollected: 4
        },
        {

            username: "Mario",
            score: 13,
            time: "01:48",
            tpCollected: 6,
            sanitizerCollected: 4
        },
        {

            username: "Mario",
            score: 14,
            time: "01:48",
            tpCollected: 6,
            sanitizerCollected: 4
        }
    ]
    res.send(games)
})

app.post('/games', (req, res) => {
    console.log("Received request to submit a new game score.")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
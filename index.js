const express = require('express')
const app = express()
const cors = require('cors');

require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://covid-chaos-frontend.onrender.com'
    ]
}));

app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/top-five', async (req, res) => {
    console.log("Fetching top five from DB...");

    const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('score', { ascending: false })
        .limit(5);

    if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch scores' });
    }

    res.json(data);
})

app.post('/games', async (req, res) => {
    const { username, score, time, tp_collected, sanitizer_collected } = req.body;

    const { data, error } = await supabase
        .from('games')
        .insert([
            { username, score, time, tp_collected, sanitizer_collected }
        ]);

    if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to submit game score' });
    }

    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
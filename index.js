import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import * as db from './db.js';

const app = express();
app.use(cors());

app.get('/songsAmount', async (req, res) => {
  await db.exec(async (client) => {
    const result = await client.query('select max(numer) from koinonia.spis');
    res.json({ max: result.rows[0].max });
  });
});

app.get('/song', async (req, res) => {
  await db.exec(async (client) => {
    const result = await client.query('select * from koinonia.tekst where numer=$1 order by id', [req.query.songNo]);
    console.log(result.rows);
    res.json(result.rows);
  });
});

app.get('/songsList', async (req, res) => {
  await db.exec(async (client) => {
    const result = await client.query('select * from koinonia.spis where numer between $1 and $2 order by numer', [req.query.startIndex, req.query.endIndex]);
    res.json(result.rows);
  });
});

const handler = serverless(app)
export { handler }
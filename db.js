import pg from 'pg';
import pgConfig from './dbConfig.js';
const pool = new pg.Pool(pgConfig);

const exec = async (f, pgClient = null) => {
  let client = pgClient;
  if (!client) client = await pool.connect();

  try {
    return await f(client);
  } finally {
    if (!pgClient) await client.release();
  }
}

export { exec };


import url from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

const params = url.parse(process.env.POSTGRES_CONNECTION);
const auth = params.auth.split(':');
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  idleTimeoutMillis: 0.001,
};

export default config;

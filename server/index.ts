import express from 'express';
import { setupWsServer } from './ws/setup.js';
import { setupRemixServer } from './http/setup.js';
import { config } from 'dotenv';
import { setupAuth } from './http/auth.js';

config();

const app = express();

app.disable('x-powered-by');

setupAuth(app);

await setupRemixServer(app);

const port = process.env.PORT || 3000;
const httpServer = app.listen(port, () =>
  console.log(`✅ Express server listening at http://localhost:${port}`)
);

setupWsServer(httpServer);

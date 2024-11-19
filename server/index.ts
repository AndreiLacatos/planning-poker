import express from 'express';
import { setupRemixServer } from './http/setup.js';
import { setupAuth } from './http/auth.js';
import { config } from 'dotenv';
import { setupWsServer } from './ws/setup.js';

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

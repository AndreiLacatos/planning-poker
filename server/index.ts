import express from 'express';
import { setupWsServer } from './ws/setup.js';
import { setupRemixServer } from './http/setup.js';

const app = express();

app.disable('x-powered-by');

await setupRemixServer(app);

const port = process.env.PORT || 3000;
const httpServer = app.listen(port, () =>
  console.log(`✅ Express server listening at http://localhost:${port}`)
);

setupWsServer(httpServer);

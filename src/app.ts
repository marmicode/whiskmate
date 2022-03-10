import { json } from 'body-parser';
import * as express from 'express';

export const app = express();

app.use(json());

app.get('/', (req, res) => {
  res.send('👋 Welcome!');
});

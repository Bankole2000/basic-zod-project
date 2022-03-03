import express from 'express';
import cors from 'cors';
import log from './utils/logger';
import routes from './routes';
const app = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
  log.info("🚀 ~ file: app.ts ~ line 9 ~ app.listen ~ port", port)
  log.info(`🚀 App is running at http://localhost:${port}`);
  routes(app);
})

// (081 091-83784
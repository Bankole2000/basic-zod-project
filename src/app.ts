import express from 'express';
import cors from 'cors';
import log from './utils/logger';
import routes from './routes';
const app = express();
const port = process.env.PORT || 5100;

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
  log.info(`🚀 App is running at http://localhost:${port}`);
  routes(app);
})
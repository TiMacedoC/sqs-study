import express from 'express';
import dotenv from 'dotenv';
import { router } from './router';

const bootstrap = () => {
  dotenv.config();

  const app = express();

  const pasta = String(process.env.PWD);

  app.use(express.static(pasta));
  app.use(express.json());

  const port = process.env.PORT || 2002;

  app.listen(port, () =>
    console.log(`\n🚀 Server ready at http://localhost:${port}\n`)
  );

  router(app);
};

bootstrap();

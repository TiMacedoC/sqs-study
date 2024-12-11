import { Express } from 'express';
import { geradorImagens } from './geradorImagens';

export function router(app: Express) {
  app.post('/solicitar-imagens', (req, res) => {
    return geradorImagens(req, res);
  });
}

import { Request, Response } from 'express';
import { sqsConfig } from './sqs-config';

export async function geradorImagens(req: Request, res: Response) {
  const qtdeImagens = parseInt(req.body.qtdeImagens);

  const { AWS_QUEUE_URL } = process.env;

  const sqs = sqsConfig();

  for (let i = 0; i < qtdeImagens; i++) {
    await sqs
      .sendMessage({
        MessageBody: 'Imagem' + i,
        QueueUrl: String(AWS_QUEUE_URL),
      })
      .promise()
      .then((data) => {
        console.log(
          JSON.stringify({
            status: 'sucesso',
            MessageId: data.MessageId,
          })
        );
      })
      .catch((error) => console.error(error));
  }

  console.log('end');

  res.send({ ok: true }).status(200);
}

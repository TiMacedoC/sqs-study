import axios from 'axios';
import fs from 'node:fs';
import { sqsConfig } from './sqs-config';
import dotenv from 'dotenv';

const sqs = sqsConfig();
dotenv.config();

export const getEnv = () => {
  const { AWS_QUEUE_URL, AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } =
    process.env;

    return{

      AWS_QUEUE_URL: () => String(AWS_QUEUE_URL);
      AWS_REGION: () => String(AWS_REGION);
      AWS_ACCESS_KEY: () => String(AWS_ACCESS_KEY);
      AWS_SECRET_ACCESS_KEY: () => String(AWS_SECRET_ACCESS_KEY);
    }
};

export const gerarImagem = async () => {
  const availableMessage = await checkAvailableMessages();

  if (availableMessage) {
    new Promise((resolve) => {
      receiveMessages().then(processMessages);
      gerarImagem();
      setTimeout(() => resolve, 3000);
    });
  }
};

const checkAvailableMessages = async () => {
  const { Attributes } = await sqs
    .getQueueAttributes({
      QueueUrl: getEnv().AWS_QUEUE_URL(),
      AttributeNames: ['All'],
    })
    .promise();

  console.log(
    `\nAvailableMessages: ${Attributes?.ApproximateNumberOfMessages} `
  );

  return Boolean(Number(Attributes?.ApproximateNumberOfMessages));
};

const receiveMessages = async () => {
  const params = {
    QueueUrl: AWS_QUEUE_URL,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 10,
  };

  try {
    const data = await sqs.receiveMessage(params).promise();

    return data.Messages || [];
  } catch (err) {
    console.error('Error', err);
    throw err;
  }
};

const processMessages = async (messages) => {
  for (const message of messages) {
    console.log('Received message:', message.Body);
    generateRadonCat(message.Body);

    const deleteParams = {
      QueueUrl: getEnv().AWS_QUEUE_URL(),
      ReceiptHandle: message.ReceiptHandle,
    };
    await sqs.deleteMessage(deleteParams).promise();
  }
};

const generateRadonCat = async (nomeArquivo) => {
  const res = await axios.get('https://cataas.com/cat', {
    headers: { Accept: 'image/*' },
    responseType: 'arraybuffer',
  });

  fs.createWriteStream(`img/${nomeArquivo}-${new Date().valueOf()}.jpeg`).write(
    res.data
  );
};

gerarImagem();

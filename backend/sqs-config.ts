import aws from 'aws-sdk';
import { getEnv } from './main';

export function sqsConfig() {
  aws.config.update({
    region: getEnv().AWS_REGION(),
    accessKeyId: getEnv().AWS_ACCESS_KEY(),
    secretAccessKey: getEnv().AWS_SECRET_ACCESS_KEY(),
  });

  const sqs = new aws.SQS();

  return sqs;
}

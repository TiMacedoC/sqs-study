import aws from 'aws-sdk';

export function sqsConfig() {
  const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;

  aws.config.update({
    region: String(AWS_REGION),
    accessKeyId: String(AWS_ACCESS_KEY),
    secretAccessKey: String(AWS_SECRET_ACCESS_KEY),
  });

  return new aws.SQS();
}

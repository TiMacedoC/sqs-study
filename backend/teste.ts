const getEnv = () => {
  return {
    AWS_QUEUE_URL: () => String('AWS_QUEUE_URL'),
    AWS_REGION: () => String('AWS_REGION'),
    AWS_ACCESS_KEY: () => String('AWS_ACCESS_KEY'),
    AWS_SECRET_ACCESS_KEY: () => String('AWS_SECRET_ACCESS_KEY'),
  };
};

console.log(getEnv().AWS_ACCESS_KEY());

import serverless from 'serverless-http';
import app from '../../server/server.js';

const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  if (context) {
    context.callbackWaitsForEmptyEventLoop = false;
  }
  if (event && event.path && event.path.startsWith('/.netlify/functions/api')) {
    event.path = event.path.replace('/.netlify/functions/api', '/api');
  }
  return await serverlessHandler(event, context);
};

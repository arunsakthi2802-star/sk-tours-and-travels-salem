import serverless from 'serverless-http';
import app from '../../server/server.js';

const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  if (context) {
    context.callbackWaitsForEmptyEventLoop = false;
  }
  if (event && event.path) {
    if (event.path.startsWith('/.netlify/functions/api')) {
      event.path = event.path.replace('/.netlify/functions/api', '/api');
    }
  }
  try {
    return await serverlessHandler(event, context);
  } catch (err) {
    console.error('Unhandled serverless handler error:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        status: 'error',
        message: err.message
      })
    };
  }
};

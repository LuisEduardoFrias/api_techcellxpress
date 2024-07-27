import { app } from '../src/app.js';

export function GET(request) {
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}

export default app;
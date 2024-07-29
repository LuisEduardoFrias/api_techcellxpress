//
import { ORIGIN, METHODS } from './config.js';
console.log("Origin", ORIGIN)
const configCors = {
  origin: "https://client-techcellxpress.vercel.app",
  accept: 'application/json',
  methods: METHODS,
  credentials: true,
  //credentials: true,
  //allowedHeaders: 'Content-Type,Authorization',
};

export default configCors;
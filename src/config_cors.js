//
import { ORIGIN, METHODS } from './config.js';
console.log("Origin", ORIGIN)
const configCors = {
  origin: ORIGIN,
  accept: 'application/json',
  methods: METHODS,
  credentials: true,
  //credentials: true,
  //allowedHeaders: 'Content-Type,Authorization',
};

export default configCors;
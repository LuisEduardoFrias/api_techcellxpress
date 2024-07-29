//
import { ORIGIN, METHODS } from './config.js';
console.log("Cors cross origin: ", origin)
const configCors = {
  origin: ORIGIN,
  accept: 'application/json',
  methods: METHODS,
  credentials: true,
  //credentials: true,
  //allowedHeaders: 'Content-Type,Authorization',
};

export default configCors;
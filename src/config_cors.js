//
import { ORIGIN, METHODS } from './config.js';
console.log("Cors cross origin: ", ORIGIN)
const configCors = {
  origin: ORIGIN,
  accept: 'application/json',
  methods: METHODS,
  credentials: true,
  //credentials: true,
  //allowedHeaders: 'Content-Type,Authorization',
};

export default configCors;
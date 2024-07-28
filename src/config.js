//
import dotenv from 'dotenv';

dotenv.config();

export const {
  PROTOCOL = process.env.PROTOCOL || 'http://',
  SWAGGER = process.env.SWAGGER || '/', //'/api-docs',
  DOMAIN = process.env.DOMAIN || 'localhost:',
  SECRET_ENCRYOT_KEY = process.env.SALT || 'tcx-crypto',
  PORT = process.env.PORT || 3000,
  ORIGIN = process.env.ORIGIN || ['http://localhost:3000', 'http://localhost:3010'],
  METHODS = process.env.METHODS || ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || "3$t0EsUnC0d1guBonoS3cr3t0_p@r@-t0d0L4@p",
  POSTGRES_VERCEL_URL = process.env.POSTGRES_VERCEL_URL
} = process.env;
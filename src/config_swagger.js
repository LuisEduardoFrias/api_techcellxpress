import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = swaggerJSDoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Api Documentation',
      version: '1.0.0'
    }
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`]
};

const swaggerDoc = swaggerJSDoc(options);
export default swaggerDoc;
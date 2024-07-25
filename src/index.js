import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieparser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { createServer } from "http";

import sequelize from '../src/libs/db.js';
import { PORT, PROTOCOL, DOMAIN } from './config.js';
import swaggerDoc from './config_swagger.js';
import configCors from './config_cors.js';
//
//sync tables dabe
//import '../src/models/models_db.js';
//
import registerLogin from './routes/register_login.js';
import phoneProduct from './routes/phone_product.js';
import admin from './routes/admin.js';
import Socket from './helpers/socket.js';
import Admin from './controllers/admin_controller.js';
//----------------------------

const app = express();
const httpServer = createServer(app);

//settings
app.set('protocol', PROTOCOL);
app.set('domain', DOMAIN);
app.set('port', PORT);
app.set('swagger', '/api-docs');

app.disabled("x-powered-by");

//swagger
app.use(app.get('swagger'), swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(morgan('dev')); // combined

app.use(
  cors(configCors)
);

Socket(httpServer, "removeAll", (emit) => {
  Admin.removeAllWithprogress((progress) =>
    emit('ProgressRemoveDb', progress));
});

//routers
app.use(registerLogin);
app.use('/product', phoneProduct);
app.use('/admin', admin);

//
httpServer.listen(PORT, () => {

  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Db connected.');
    } catch (error) {
      console.error(error);
    }
  })();

  console.log(`server on port:${PORT}`);
  console.log(`swagger => ${app.get('swagger')}`);
});
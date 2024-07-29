//
import express from 'express';
import _static from 'serve-static';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { createServer } from "http";

import { PORT, /*PROTOCOL, DOMAIN, */ SWAGGER } from '../src/config.js';
import sequelize from '../src/libs/db.js';
import swaggerDoc from '../src/config_swagger.js';
import configCors from '../src/config_cors.js';
//

//sync tables dabe
//import '../src/models/models_db.js';
//
import session from '../src/routes/session.js';
import phoneProduct from '../src/routes/phone_product.js';
import home from '../src/routes/home.js';
import admin from '../src/routes/admin.js';
import Socket from '../src/helpers/socket.js';
import Admin from '../src/controllers/admin_controller.js';
//----------------------------

const app = express();
const httpServer = createServer(app);
const { pathname: root } = new URL('../../', import.meta.url)

//settings
//app.set('protocol', PROTOCOL);
//app.set('domain', DOMAIN);
//app.set('port', PORT);
app.disabled("x-powered-by");

//swagger
app.use(_static(root + '/public'));
app.use(SWAGGER, swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev')); // combined

app.use(cors(configCors));

//web socket
Socket(httpServer, "removeAll", (socket) => {

  (async () => {

    const ard = await Admin.removeAllWithprogress((progress) => {
      try {
        socket?.emit('ProgressRemoveDb', progress);
      } catch (error) {
        console.log("error: " + error)
      }
    });

    socket.emit('DeleteCompleted', ard);

  })()
});

//routers
app.use(home);
app.use(session);
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
  console.log(`swagger => ${SWAGGER}`);
});

export default app;
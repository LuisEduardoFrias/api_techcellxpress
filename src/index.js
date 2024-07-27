import sequelize from '../src/libs/db.js';
import { PORT, SWAGGER } from './config.js';
import httpServer from './app.js';

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
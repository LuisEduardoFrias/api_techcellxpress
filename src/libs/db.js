//
import { Sequelize } from 'sequelize';
import { POSTGRES_VERCEL_URL } from '../config.js';

const sequelize = new Sequelize(POSTGRES_VERCEL_URL, {
  dialect: 'postgres'
});

export default sequelize;
//
import { Sequelize } from 'sequelize';
import { POSTGRES_VERCEL_URL } from '../config.js';
console.log(POSTGRES_VERCEL_URL)
const sequelize = new Sequelize(POSTGRES_VERCEL_URL, {
  dialect: 'postgres'
});

export default sequelize;
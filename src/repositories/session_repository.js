//
import { User } from '../models/models_db.js';

export async function login(user) {
  let findUser = await User.findOne({ where: { user } });

  if (!findUser)
    findUser = await User.findOne({ where: { email: user } });

  if (findUser)
    return findUser;

  return null;
}

export async function logout(id) {
  const findUser = await User.findByPk(id);

  if (findUser)
    return findUser;

  return null;
}

export async function register(newRegister) {
  return await User.create(newRegister);
}

export async function selectBy(email, user) {
  return await User.findOne({ where: { email, user } });
}
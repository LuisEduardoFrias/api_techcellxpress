//
import { login, logout, register, selectBy } from '../repositories/session_repository.js';
import User from '../models/user_model.js';
import UserDto from '../dtos/user_dto.js';
import { hashPassword, comparePasswords } from '../helpers/encypt.js';

export default class RegisterLogin {

  static async login(user, password) {
    const result = await login(user);

    if (!result)
      return { error: "user not found", data: null };

    if (await comparePasswords(password, result.password))
      return { error: null, data: UserDto.mapper(result) };

    return { error: "Incorrect password", data: null };
  }
  //
  static async logout(user) {

    const result = await logout(user.id);

    if (!result)
      return { error: 'user not found', data: null };

    return { error: null, data: result };
  }
  //
  static async register(_register) {
    //encript password, Bcrypt

    const findUser = await selectBy(_register.email, _register.user);

    if (findUser)
      return { error: "The user exists.", data: null };

    const user = User.mapper(_register);
    user.password = await hashPassword(user.password);

    const result = await register(user);

    return { error: null, data: UserDto.mapper(result) };
  }
}
//
import { login as logIn, logout as logOut, register as register_, selectBy } from '../repositories/session_repository.js';
import User from '../models/user_model.js';
import UserDto from '../dtos/user_dto.js';
import { hashPassword, comparePasswords } from '../helpers/encypt.js';

export default class RegisterLogin {

  static async login(user, password) {
    const result = await logIn(user);

    if (!result)
      return { error: "User not found.", data: null };

    if (await comparePasswords(password, result.password))
      return { error: null, data: new UserDto(result) };

    return { error: "Incorrect password.", data: null };
  }

  //
  static async logout(user) {

    const result = await logOut(user.id);

    if (!result)
      return { error: 'User not found.', data: null };

    return { error: null, data: result };
  }

  //
  static async register(_register) {
    //encript password, Bcrypt

    const findUser = await selectBy(_register.email, _register.user);

    if (findUser)
      return { error: "The user exists.", data: null };

    _register.password = await hashPassword(_register.password);
    const user = User.mapper(_register);

    const result = await register_(user);

    return { error: null, data: new UserDto(result) };
  }

}
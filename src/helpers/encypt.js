//
import pkg from 'crypto-js';
import { SECRET_ENCRYOT_KEY } from '../config.js';
const { enc, AES } = pkg;

export async function hashPassword(password) {
  try {
    return AES.encrypt(password, SECRET_ENCRYOT_KEY).toString();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function comparePasswords(plain, hashed) {
  try {
    const decrypted = AES.decrypt(hashed, SECRET_ENCRYOT_KEY).toString(enc.Utf8);
    return plain === decrypted;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
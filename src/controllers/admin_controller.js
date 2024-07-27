//
import { loadProducts as load, allRemove, removeAllWithprogress as remoceAWP } from '../repositories/admin_repository.js';
import { insert as capacityInsert } from '../repositories/capacity_repository.js';
import Phone from '../models/phone_model.js';

export default class Admin {
  static async loadProducts(phones) {
    const chunkedPhones = this.#chunkArray(phones, 10);

    let result;
    for (let chunk of chunkedPhones) {
      for (let i = 0; i < chunk.length; i++) {
        const _phone = new Phone(chunk[i]);
        const capacity = await capacityInsert(_phone.capacity);
        _phone.capacity = capacity.id;
        chunk[i] = _phone;
      }

      result = await load(chunk);
    }

    if (!result)
      return { error: 'default error', data: null };

    return { error: null, data: result };
  }
  //
  static #chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  //
  static async removeAll() {
    const result = await allRemove();

    if (result >= 0)
      return { error: null, data: result };

    return { error: 'default error', data: null };

  }
  //
  static async removeAllWithprogress(progressNotify) {
    await remoceAWP(progressNotify);
  }
}
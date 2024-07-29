import { insert, select, selectBy, selectById, update as udtPhone, remove as rv } from '../repositories/phone_product_repository.js';
import { insert as capacityInsert, selectById as capacityById, update as udtCapacity } from '../repositories/capacity_repository.js';
import Phone from '../models/phone_model.js';
import PhoneDto from '../dtos/phone_dto.js';

export default class PhoneProduct {
  static async create(newPhone) {
    const findPhone = await selectBy(newPhone.imei);

    if (!findPhone) {
      const capacity = await capacityInsert(newPhone.capacity);
      newPhone.capacity = capacity.id;

      const phone = await insert(newPhone);
      return { error: null, data: new PhoneDto(phone) };
    }

    return { error: 'default error', data: null };
  }
  //
  static async read() {
    const data = await select();

    if (data)
      return { error: null, data }

    return { error: 'default error', data: null }
  }
  //
  static async search(text = null) {

    const { error, data } = await PhoneProduct.read();

    if (!data) return { error: 'No data found.', data: null };

    function map(_data) {
      return _data.map(e => ({
        brand: e.brand,
        model: e.model,
        imgUrl: e.imgUrl,
        color: e.color
      }))
    }

    if (text === "undefined") {
      return {
        error: null, data: map(data)
      };
    }

    const filterData = data.filter(e => {
      const fullName = `${e.brand} ${e.model}`;
      return fullName.includes(text);
    });

    return { error: null, data: map(filterData) };
  }
  //
  static async readById(id) {
    const data = await selectById(id);

    if (data) {
      const capacity = await capacityById(data.dataValues.capacity);

      if (!capacity) {
        return { error: 'default error', data: null }
      }

      data.capacity = capacity;
      return { error: null, data }
    }

    return { error: 'default error', data: null }
  }
  //
  static async update(id, update) {

    const capacity = update.capacity;

    const cap = await udtCapacity(capacity.id, capacity);
    
    if (cap) {
      update.capacity = capacity.id;
      const data = await udtPhone(id, update);

      if (data)
        return { error: null, data };
    }

    return { error: 'default error', data: null };
  }
  //
  static async remove(id) {
    const data = await rv(id);

    if (data === 0)
      return { error: null, data }

    return { error: 'default error', data: null }
  }
}
//
import { Capacity } from '../models/models_db.js';
//
export async function insert(newCapacity) {
  return await Capacity.create(newCapacity);
}
//
export async function selectById(id) {
  return await Capacity.findByPk(id);
}
//
export async function update(id, update) {
  const _capacity = selectById(id);
  _capacity.set(update);
  return await _capacity.save();
}
//
export async function remove(id) {
  return await Capacity.destroy({
    where: { id }
  });
}
//
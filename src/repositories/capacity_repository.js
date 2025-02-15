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
export async function update(id, capacity) {
  const _capacity = await Phone.findByPk(id);

  await _capacity.update({ ...capacity });

  return await _capacity.save();
}
//
export async function remove(id) {
  return await Capacity.destroy({
    where: { id }
  });
}
//
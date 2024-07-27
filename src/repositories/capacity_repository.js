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
  return await Capacity.update(
    {
      rom: capacity.rom,
      ramMemory: capacity.ramMemory,
      processor: capacity.processor
    },
    {
      where: {
        id: id
      },
    },
  );
}
//
export async function remove(id) {
  return await Capacity.destroy({
    where: { id }
  });
}
//
//
import { Phone, Capacity } from '../models/models_db.js';
import { remove as capacitRemove } from '../repositories/capacity_repository.js';
//
export async function insert(newPhone) {
  return await Phone.create(newPhone);
}
//
export async function select() {
  return await Phone.findAll();
}
//
export async function selectBy(imei) {
  return await Phone.findOne({ where: { imei } });
}
//
export async function selectById(id) {
  //return await Phone.findByPk(id);
  return await Phone.findOne({
    where: { id },
    include: Capacity
  });
}
//
export async function update(id, phone) {
  const _phone = await Phone.findByPk(id);

  await _phone.update({ ...phone });

  return await _phone.save();
}
//
export async function remove(id) {
  const _phone = await selectById(id);
  await capacitRemove(_phone.capacity);
  return await Phone.destroy({
    where: { id }
  });
}
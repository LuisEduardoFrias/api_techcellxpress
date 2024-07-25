//
import { Phone } from '../models/models_db.js';
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
  return await Phone.findByPk(id);
}
//
export async function update(id, update) {
  const _phone = await selectById(id);
  update.capacity = _phone.capacity;
  
  const updateWithoutImei = Object.assign({}, update);
  delete updateWithoutImei.imei;

  return await Phone.update(updateWithoutImei, { where: { id } });
}
//
export async function remove(id) {
  const _phone = await selectById(id);
  await capacitRemove(_phone.capacity);
  return await Phone.destroy({
    where: { id }
  });
}
//
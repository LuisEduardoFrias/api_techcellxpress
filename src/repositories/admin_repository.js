//
import { Phone } from '../models/models_db.js';
import { Capacity } from '../models/models_db.js';
import sequelize from '../libs/db.js';

export async function loadProducts(phones) {
  return await Phone.bulkCreate(phones);
}

export async function allRemove() {
  // const result = await Capacity.destroy({ where: {} });
  const result = await Phone.destroy({ where: {} });

  return result;
}

export async function removeAllWithprogress(_removeAllWithprogress) {

  const phones = await Phone.findAll();
  const capacities = await Capacity.findAll();
  const totalRecords = await Phone.count() + await Capacity.count()

  const allRecords = [...phones, ...capacities]
  let recordsDeleted = 0;
  const arrayRecordDeleted = [];

  for (const record of allRecords) {
    arrayRecordDeleted.push(record);
    await record.destroy();
    recordsDeleted++;

    const progressPercentage = (recordsDeleted / totalRecords) * 100;
    _removeAllWithprogress(progressPercentage.toFixed(2));
  }

  return arrayRecordDeleted;

}
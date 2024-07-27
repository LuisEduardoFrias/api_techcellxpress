//
import { Phone } from '../models/models_db.js';
import { Capacity } from '../models/models_db.js';
import sequelize from '../libs/db.js';

export async function loadProducts(phones) {
  return await Phone.bulkCreate(phones);
}

export async function allRemove() {
  let result = await Capacity.destroy({ where: {} });

  if (result === 0)
    result = await Phone.destroy({ where: {} });

  return result;
}

export async function removeAllWithprogress(removeAllWithprogress) {
  return allRemove();
  /*
   const transaction = await sequelize.transaction();
 
   try {
 
     const totalRecords = await Phone.count();
 
     let recordsDeleted = 0;
 
     await Phone.destroy({
       where: {}, transaction, individualHooks: true, progress: (instance, progress) => {
         recordsDeleted++;
         const progressPercentage = (recordsDeleted / totalRecords) * 100;
         removeAllWithprogress(progressPercentage.toFixed(2));
 
         console.log(`Progress: ${progressPercentage.toFixed(2)}%`);
       }
     });
     
         
         let i = 0;
         while (i < 1000) {
           i++;
           const progressPercentage = (i / totalRecords) * 100;
           removeAllWithprogress(progressPercentage.toFixed(2));
         }
     
     await transaction.commit();
 
     console.log('Deletion process completed.');
 
   } catch (error) {
     await transaction.rollback();
     console.error('Error deleting data:', error);
   }
   */
}
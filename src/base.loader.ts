import * as Dataloader from 'dataloader';
import { getRepository, getConnection } from 'typeorm';


export const oneToManyLoader = (select:any, tableName: string, foreignKey: string) =>
new Dataloader(async (keys: number[]) => {
  select.push(tableName + '.' + foreignKey);
  const _ = require('lodash');
  const polloptions = await getRepository(tableName)
  .createQueryBuilder(tableName)
  .select(select)
  .where(foreignKey + ' IN (:...keys)', { keys })
  .getMany();
  const gs = _.groupBy(polloptions, foreignKey)
  return keys.map(k => gs[k] || []);
});

export const oneToManyCountLoader = (tableName: string, foreignKey: string) =>
new Dataloader(async (keys: number[]) => {
  const conn = getConnection();
  const polloptions = await conn.query(`SELECT ${foreignKey}, COUNT(${foreignKey}) AS oneToManyCount FROM ${tableName} GROUP BY ${foreignKey}`);
  return keys.map(k => polloptions.find(obj => obj[foreignKey] === k) ? polloptions.find(obj => obj[foreignKey] === k).oneToManyCount : 0);
});

export const manyToOneLoader = (select:any, tableName: string) =>
new Dataloader(async (keys: number[]) => {
  select.push('id')
  const gs = await getRepository(tableName)
  .createQueryBuilder(tableName)
  .select(select)
  .where('id IN (:...keys)', { keys })
  .getMany();
  return keys.map(k => gs.find(obj => obj['id'] === k));
});
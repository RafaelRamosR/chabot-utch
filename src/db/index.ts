import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { DatabaseSchema, initialSchema } from './types';

export const getConnection = (): lowdb.LowdbSync<DatabaseSchema> => {
  const adapter = new FileSync<DatabaseSchema>('bot-db.json');
  const db: lowdb.LowdbSync<DatabaseSchema> = lowdb(adapter);
  return db;
};

export const initDatabase = () => {
  const db = getConnection();
  db.defaults(initialSchema).write();
};

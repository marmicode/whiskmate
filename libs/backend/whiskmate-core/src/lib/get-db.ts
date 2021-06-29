import { join } from 'path';
import { Recipe } from './recipe-repository';

export async function getDb() {
  /* @hack due to node builder using webpack and lowdb is an es6 module. */
  const { Low, JSONFile } = await import(/* webpackIgnore: true */ 'lowdb');
  const db = new Low<{
    recipes: Recipe[];
  }>(new JSONFile(join(__dirname, 'assets/db.json')));

  await db.read();

  return db;
}

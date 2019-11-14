import Model from './Model';

export default class User extends Model {
  static get tableName() {
    return 'users';
  }
}

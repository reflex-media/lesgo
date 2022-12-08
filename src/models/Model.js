import db from 'lesgo/utils/database';
import { Model as BaseModel } from 'objection/lib/model/Model';

BaseModel.knex(db().query);

export default class Model extends BaseModel {}

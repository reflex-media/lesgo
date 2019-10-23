/**
 * > To import this, you do it this way.
 *      import connection from 'Models'
 *
 * > To get the model
 *      connection.models.User
 *
 * > To do sync request
 *      connection.sync()
 *        .then(() => User.create({
 *            name: 'janedoe',
 *            email: 'jane.doe@gmail.com',
 *            ...
 *        }))
 *        .then(jane => {
 *            console.log(jane.toJSON());
 *        });
 */

import DatabaseConnection from 'Factories/database';
import User from './User';

const connection = DatabaseConnection(/* 'mysql' */);

User(connection);
// YourModelHere(connection);

export default connection;

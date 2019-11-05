/**
 * > To import this, you do it this way.
 *      import User from 'Models/User'
 *
 * > To get the connection
 *      User.connection
 *
 * > To query
 *      User.findAll({
 *        where: {
 *          email: 'daison12006013@gmail.com'
 *        }
 *      }).then(record => {
 *        console.log(record);
 *      })
 */

import { Sequelize, Model } from 'sequelize';
import DatabaseConnection from 'Utils/database';

const attributes = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email_verified_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  remember_token: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

/**
 * class that extends the sequelize model.
 */
class User extends Model {}

const init = conn => {
  User.init(attributes, {
    sequelize: conn || DatabaseConnection(/* 'mysql' */),
  });

  return User;
};

export default init;

const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const sales = sequelize.define(
    'sales',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quantity_sold: {
        type: DataTypes.INTEGER,
      },

      sale_date: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  sales.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.sales.belongsTo(db.products, {
      as: 'product',
      foreignKey: {
        name: 'productId',
      },
      constraints: false,
    });

    db.sales.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.sales.belongsTo(db.organizations, {
      as: 'organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.sales.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.sales.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return sales;
};

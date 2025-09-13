const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProductsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const products = await db.products.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        quantity: data.quantity || null,
        expiry_date: data.expiry_date || null,
        type: data.type || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await products.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await products.setOrganizations(data.organizations || null, {
      transaction,
    });

    return products;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const productsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      quantity: item.quantity || null,
      expiry_date: item.expiry_date || null,
      type: item.type || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const products = await db.products.bulkCreate(productsData, {
      transaction,
    });

    // For each item created, replace relation files

    return products;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const products = await db.products.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.name !== undefined) updatePayload.name = data.name;

    if (data.description !== undefined)
      updatePayload.description = data.description;

    if (data.quantity !== undefined) updatePayload.quantity = data.quantity;

    if (data.expiry_date !== undefined)
      updatePayload.expiry_date = data.expiry_date;

    if (data.type !== undefined) updatePayload.type = data.type;

    updatePayload.updatedById = currentUser.id;

    await products.update(updatePayload, { transaction });

    if (data.organization !== undefined) {
      await products.setOrganization(
        globalAccess ? data.organization : currentUser.organization.id,
        { transaction },
      );
    }

    if (data.organizations !== undefined) {
      await products.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    return products;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const products = await db.products.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of products) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of products) {
        await record.destroy({ transaction });
      }
    });

    return products;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const products = await db.products.findByPk(id, options);

    await products.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await products.destroy({
      transaction,
    });

    return products;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const products = await db.products.findOne({ where }, { transaction });

    if (!products) {
      return products;
    }

    const output = products.get({ plain: true });

    output.sales_product = await products.getSales_product({
      transaction,
    });

    output.organization = await products.getOrganization({
      transaction,
    });

    output.organizations = await products.getOrganizations({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;

    const user = (options && options.currentUser) || null;
    const userOrganizations = (user && user.organizations?.id) || null;

    if (userOrganizations) {
      if (options?.currentUser?.organizationsId) {
        where.organizationsId = options.currentUser.organizationsId;
      }
    }

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;

    let include = [
      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.organizations,
        as: 'organizations',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('products', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('products', 'description', filter.description),
        };
      }

      if (filter.quantityRange) {
        const [start, end] = filter.quantityRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity: {
              ...where.quantity,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.expiry_dateRange) {
        const [start, end] = filter.expiry_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            expiry_date: {
              ...where.expiry_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            expiry_date: {
              ...where.expiry_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.type) {
        where = {
          ...where,
          type: filter.type,
        };
      }

      if (filter.organization) {
        const listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.organizations) {
        const listItems = filter.organizations.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationsId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    if (globalAccess) {
      delete where.organizationsId;
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.products.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('products', 'name', query),
        ],
      };
    }

    const records = await db.products.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};

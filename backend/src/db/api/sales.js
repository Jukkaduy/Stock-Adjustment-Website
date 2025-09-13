const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class SalesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sales = await db.sales.create(
      {
        id: data.id || undefined,

        quantity_sold: data.quantity_sold || null,
        sale_date: data.sale_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await sales.setProduct(data.product || null, {
      transaction,
    });

    await sales.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await sales.setOrganizations(data.organizations || null, {
      transaction,
    });

    return sales;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const salesData = data.map((item, index) => ({
      id: item.id || undefined,

      quantity_sold: item.quantity_sold || null,
      sale_date: item.sale_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const sales = await db.sales.bulkCreate(salesData, { transaction });

    // For each item created, replace relation files

    return sales;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const sales = await db.sales.findByPk(id, {}, { transaction });

    const updatePayload = {};

    if (data.quantity_sold !== undefined)
      updatePayload.quantity_sold = data.quantity_sold;

    if (data.sale_date !== undefined) updatePayload.sale_date = data.sale_date;

    updatePayload.updatedById = currentUser.id;

    await sales.update(updatePayload, { transaction });

    if (data.product !== undefined) {
      await sales.setProduct(
        data.product,

        { transaction },
      );
    }

    if (data.organization !== undefined) {
      await sales.setOrganization(
        globalAccess ? data.organization : currentUser.organization.id,
        { transaction },
      );
    }

    if (data.organizations !== undefined) {
      await sales.setOrganizations(
        data.organizations,

        { transaction },
      );
    }

    return sales;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sales = await db.sales.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of sales) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of sales) {
        await record.destroy({ transaction });
      }
    });

    return sales;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const sales = await db.sales.findByPk(id, options);

    await sales.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await sales.destroy({
      transaction,
    });

    return sales;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const sales = await db.sales.findOne({ where }, { transaction });

    if (!sales) {
      return sales;
    }

    const output = sales.get({ plain: true });

    output.product = await sales.getProduct({
      transaction,
    });

    output.organization = await sales.getOrganization({
      transaction,
    });

    output.organizations = await sales.getOrganizations({
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
        model: db.products,
        as: 'product',

        where: filter.product
          ? {
              [Op.or]: [
                {
                  id: {
                    [Op.in]: filter.product
                      .split('|')
                      .map((term) => Utils.uuid(term)),
                  },
                },
                {
                  name: {
                    [Op.or]: filter.product
                      .split('|')
                      .map((term) => ({ [Op.iLike]: `%${term}%` })),
                  },
                },
              ],
            }
          : {},
      },

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

      if (filter.quantity_soldRange) {
        const [start, end] = filter.quantity_soldRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            quantity_sold: {
              ...where.quantity_sold,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            quantity_sold: {
              ...where.quantity_sold,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.sale_dateRange) {
        const [start, end] = filter.sale_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            sale_date: {
              ...where.sale_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            sale_date: {
              ...where.sale_date,
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
      const { rows, count } = await db.sales.findAndCountAll(queryOptions);

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
          Utils.ilike('sales', 'product', query),
        ],
      };
    }

    const records = await db.sales.findAll({
      attributes: ['id', 'product'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['product', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.product,
    }));
  }
};

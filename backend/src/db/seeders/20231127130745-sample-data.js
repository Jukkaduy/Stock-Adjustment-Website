const db = require('../models');
const Users = db.users;

const Products = db.products;

const Sales = db.sales;

const Organizations = db.organizations;

const ProductsData = [
  {
    name: 'Milk',

    description: 'Fresh whole milk',

    quantity: 100,

    expiry_date: new Date('2023-11-15T00:00:00Z'),

    type: 'consumable',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Desk',

    description: 'Wooden office desk',

    quantity: 20,

    expiry_date: new Date('2025-01-01T00:00:00Z'),

    type: 'unconsumable',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Yogurt',

    description: 'Strawberry flavored yogurt',

    quantity: 50,

    expiry_date: new Date('2023-11-10T00:00:00Z'),

    type: 'unconsumable',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Table',

    description: 'Round dining table',

    quantity: 15,

    expiry_date: new Date('2025-06-01T00:00:00Z'),

    type: 'consumable',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const SalesData = [
  {
    // type code here for "relation_one" field

    quantity_sold: 50,

    sale_date: new Date('2023-10-01T00:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    quantity_sold: 30,

    sale_date: new Date('2023-10-02T00:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    quantity_sold: 100,

    sale_date: new Date('2023-10-03T00:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    quantity_sold: 5,

    sale_date: new Date('2023-10-04T00:00:00Z'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'TechCorp',
  },

  {
    name: 'HealthPlus',
  },

  {
    name: 'EduWorld',
  },

  {
    name: 'Foodies',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }
}

async function associateProductWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Product0 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Product0?.setOrganization) {
    await Product0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Product1 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Product1?.setOrganization) {
    await Product1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Product2 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Product2?.setOrganization) {
    await Product2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Product3 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Product3?.setOrganization) {
    await Product3.setOrganization(relatedOrganization3);
  }
}

async function associateProductWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Product0 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Product0?.setOrganization) {
    await Product0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Product1 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Product1?.setOrganization) {
    await Product1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Product2 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Product2?.setOrganization) {
    await Product2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Product3 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Product3?.setOrganization) {
    await Product3.setOrganization(relatedOrganization3);
  }
}

async function associateSaleWithProduct() {
  const relatedProduct0 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Sale0 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Sale0?.setProduct) {
    await Sale0.setProduct(relatedProduct0);
  }

  const relatedProduct1 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Sale1 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Sale1?.setProduct) {
    await Sale1.setProduct(relatedProduct1);
  }

  const relatedProduct2 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Sale2 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Sale2?.setProduct) {
    await Sale2.setProduct(relatedProduct2);
  }

  const relatedProduct3 = await Products.findOne({
    offset: Math.floor(Math.random() * (await Products.count())),
  });
  const Sale3 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Sale3?.setProduct) {
    await Sale3.setProduct(relatedProduct3);
  }
}

async function associateSaleWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Sale0 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Sale0?.setOrganization) {
    await Sale0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Sale1 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Sale1?.setOrganization) {
    await Sale1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Sale2 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Sale2?.setOrganization) {
    await Sale2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Sale3 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Sale3?.setOrganization) {
    await Sale3.setOrganization(relatedOrganization3);
  }
}

async function associateSaleWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Sale0 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Sale0?.setOrganization) {
    await Sale0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Sale1 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Sale1?.setOrganization) {
    await Sale1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Sale2 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Sale2?.setOrganization) {
    await Sale2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Sale3 = await Sales.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Sale3?.setOrganization) {
    await Sale3.setOrganization(relatedOrganization3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Products.bulkCreate(ProductsData);

    await Sales.bulkCreate(SalesData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateProductWithOrganization(),

      await associateProductWithOrganization(),

      await associateSaleWithProduct(),

      await associateSaleWithOrganization(),

      await associateSaleWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});

    await queryInterface.bulkDelete('sales', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};

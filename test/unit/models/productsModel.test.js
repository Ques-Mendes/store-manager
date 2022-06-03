const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Tests for poductsModel layer', () => {
  describe('Test if we receive all products', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
      const response = productsModel.getAll();
      expect(response).to.be.an('promise');
    });
  })

  describe('Tests fn get product by id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
    const response = productsModel.getById(1);
    expect(response).to.be.an('promise');
    });
  });

  describe('Tests fn get product by name', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
    const response = productsModel.getProductByName(1);
    expect(response).to.be.an('promise');
    });
  });

  describe('Tests fn to create product', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
    const response = productsModel.createProduct('name', 'quantity');
    expect(response).to.be.an('promise');
    });
  });

  describe('Tests fn to update product', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
    const response = productsModel.updateProduct('id', 'name', 'quantity');
    expect(response).to.be.an('promise');
    });
  });

   describe('Tests fn to delete product', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
    const response = productsModel.deleteProduct(id);
    expect(response).to.be.an('promise');
    });
  });
})

const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Tests for salesModel layer', () => {
  describe('Test if we receive all sales', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
      const response = salesModel.getAll();
      expect(response).to.be.an('promise');
    });
  })

  describe('Tests if get sales by id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
    const response = salesModel.getById(1);
    expect(response).to.be.an('promise');
    });
  });

  describe('Tests if get sales by id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
    const response = salesModel.createSale();
    expect(response).to.be.an('promise');
    expect(connection.execute.calledWith('INSERT INTO sales (date) VALUES (now());')).to.be.equal(true);
    });
  });

  describe('Tests if get sales by id', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });

    it('Return the rigth data', () => {
    const response = salesModel.createSalesProducts(1, 2, 10);
    expect(response).to.be.an('promise');
    
    const queryExpected = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';
    const paramsExpected = [1, 2, 10];

    expect(connection.execute.calledWith(queryExpected, paramsExpected)).to.be.equal(true);  
    });
  });
})

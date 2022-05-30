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
})

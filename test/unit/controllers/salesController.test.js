const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Tests for salesController', () => {
  describe('test if the return from request is correct', () => {
    const request = {};
    const response = {};
    const serviceResponse = [];

    before(() => {
      sinon.stub(salesService, 'getSales').resolves(serviceResponse);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    after(() => {
      salesService.getSales.restore();
    });

    it('Return an array and code 200', async () => {
      await salesController.getSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(serviceResponse)).to.be.equal(true);
    });
  });

  describe('test route /sales/:id with an invalid id', () => {
    const request = {};
    const response = {};

    before(() => {
      const serviceResponseError = {
        error: true,
        message: "Sale not found",
      };
      sinon.stub(salesService, 'getSaleById').resolves(serviceResponseError);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
    });
    after(() => {
      salesService.getSaleById.restore();
    });

    it('return code 404 and message "Sale not found"', async () => {
      await salesController.getSalesById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });

  describe('Test route /sales/:id with a valid id', () => {
    const request = {};
    const response = {};
    const serviceResponse = [{ "date": "2022-05-26T00:38:03.000Z", "productId": 2, "quantity": 2 }];

    before(() => {
      sinon.stub(salesService, 'getSaleById').resolves(serviceResponse);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
    });
    after(() => {
      salesService.getSaleById.restore();
    });

    it('Return an array with the right data and code 200', async () => {
      await salesController.getSalesById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(serviceResponse)).to.be.equal(true);
    });
  });

  describe('Test fn create sales', () => {
    const request = {};
    const response = {};
    const serviceResponse = {
      "saleId": 17,
      "itemsSold": [
        {
          "productId": 3,
          "quantity": 42,
        },
    ]}

    before(() => {
      sinon.stub(salesService, 'createSale').resolves(serviceResponse);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.body = [{ "productId": 3, "quantity": 42 }];
    });
    after(() => {
      salesService.createSale.restore();
    });

    it('Return an array with sales and staus 200', async () => {
      await salesController.createSale(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(serviceResponse)).to.be.equal(true);
    });
  });

  describe('Test fn update sales when id is invalid', () => {
    const request = {};
    const response = {};
    const serviceResponseError = {
      "error": true,
      "message": 'Sale not found',
    };

    before(() => {
      sinon.stub(salesService, 'updateSale').resolves(serviceResponseError);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.body = [{ "productId": 3, "quantity": 42 }];
    });
    after(() => {
      salesService.updateSale.restore();
    });

    it('Return an obj with error and staus 404', async () => {
      await salesController.updateSale(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ "message": "Sale not found" })).to.be.equal(true);
    });
  });

  describe('Test fn update sales when id is valid', () => {
    const request = {};
    const response = {};
    const reqBody = [{ "productId": 3, "quantity": 42 }];
    const reqId = 1;
    const serviceResponse = {
      "saleId": 1,
      "itemUpdated": reqBody
    };

    before(() => {
      sinon.stub(salesService, 'updateSale').resolves(serviceResponse);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = reqId;
      request.body = reqBody;
    });
    after(() => {
      salesService.updateSale.restore();
    });

    it('Return an obj updated with status 200', async () => {
      await salesController.updateSale(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(serviceResponse)).to.be.equal(true);
    });
  });
  
})

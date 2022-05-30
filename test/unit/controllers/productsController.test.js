const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Tests productController', () => {
  describe('Request should bring either all product or an empty array', () => {

    const request = {};
    const response = {};
    const serviceResponse = [];

    before(() => {
      sinon.stub(productsService, 'getProducts').resolves(serviceResponse);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    after(() => {
      productsService.getProducts.restore();
    });

    it('Return an array and code 200', async () => {
      await productsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(serviceResponse)).to.be.equal(true);
    });
  });

  describe('Return an error when id is invalid', () => {

    const request = {};
    const response = {};

    before(() => {
      const serviceResponseError = {
        error: true,
        message: 'Product not found',
      };

      sinon.stub(productsService, 'getProductById').resolves(serviceResponseError);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params ={ id: 1 }; 
    });
    
    after(() => {
      productsService.getProductById.restore();
    });

    it('return code 404 and message "Product not found"', async () => {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });

  describe('Return an object when id is valid', () => {
    
    const request = {};
    const response = {};
    
    before(() => {
      const serviceResponse = {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      }; 

      sinon.stub(productsService, 'getProductById').resolves(serviceResponse);     
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params ={ id: 1 }; 
    });

    after(() => {
      productsService.getProductById.restore();
    });

    it('Return an object with the rigth data and code 200', async () => {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith({ id: 1,
        name: "Martelo de Thor",
        quantity: 10 })).to.be.equal(true);
    });
  });
});
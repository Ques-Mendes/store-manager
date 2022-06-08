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

  describe('Test fn create product when product exists', () => {

    const request = {};
    const response = {};
    const serviceResponseError = {
      error: true,
      message: 'Product already exists',
    };

    before(() => {
      sinon.stub(productsService, 'createProduct').resolves(serviceResponseError);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.body = { "name": "produto", "quantity": 100 };
    });
    after(() => {
      productsService.createProduct.restore();
    });

    it('Return an obj with error and status 409', async () => {
      await productsController.createProduct(request, response);
      expect(response.status.calledWith(409)).to.be.equal(true);
      expect(response.json.calledWith({ "message": "Product already exists" })).to.be.equal(true);
    });
  });

  describe('Test fn create product when register a new product', () => {

    const request = {};
    const response = {};
    const serviceResponseCreated = {
      "id": 1,
      "name": "produto",
      "quantity": 10
    };

    before(() => {
      sinon.stub(productsService, 'createProduct').resolves(serviceResponseCreated);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.body = { "name": "produto", "quantity": 100 };
    });
    after(() => {
      productsService.createProduct.restore();
    });

    it('Return an obj and status 201', async () => {
      await productsController.createProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(serviceResponseCreated)).to.be.equal(true);
    });
  });

  describe('Test fn update product when id is not found', () => {

    const request = {};
    const response = {};
    const serviceResponseError = {
      error: true,
      message: "Product not found",
    };

    before(() => {
      sinon.stub(productsService, 'getProductById').resolves(serviceResponseError);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
      request.body = {  "name": "produto", "quantity": 10 };
    });
    after(() => {
      productsService.getProductById.restore();
    });

    it('Return an obj with error and status 404', async () => {
      await productsController.updateProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ "message": "Product not found" })).to.be.equal(true);
    });
  });

  describe('Test fn update product when id is found', () => {

    const request = {};
    const response = {};
    const serviceResponse = {
      "id": "1",
      "name": "produto",
      "quantity": 10
    };

    before(() => {
      sinon.stub(productsService, 'updateProduct').resolves(serviceResponse);
      sinon.stub(productsService, 'getProductById').resolves({});
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
      request.body = {  "name": "produto", "quantity": 10 };
    });
    after(() => {
      productsService.updateProduct.restore();
      productsService.getProductById.restore();
    });

    it('Return an obj and status 200', async () => {
      await productsController.updateProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(serviceResponse)).to.be.equal(true);
    });
  });

  describe('Test fn delete product when id is not found', () => {

    const request = {};
    const response = {};
    const serviceResponseError = {
      "error": true,
      "message": "Product not found",
    };

    before(() => {
      sinon.stub(productsService, 'deleteProduct').resolves(serviceResponseError);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
    });
    after(() => {
      productsService.deleteProduct.restore();
    });

    it('Return an obj with error and status 404', async () => {
      await productsController.deleteProduct(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
      expect(response.json.calledWith({ "message": "Product not found" })).to.be.equal(true);
    });
  });

  describe('Test fn delete product when id is found', () => {

    const request = {};
    const response = {};
    const serviceResponse = {
      "id": 1,
      "deleted": true
    };

    before(() => {
      sinon.stub(productsService, 'deleteProduct').resolves(serviceResponse);
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      request.params = { id: 1 };
    });
    after(() => {
      productsService.deleteProduct.restore();
    });

    it('Return status 204', async () => {
      await productsController.deleteProduct(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
      // expect(response.end.calledOnce).to.be.equal(true);
    });
  });
});
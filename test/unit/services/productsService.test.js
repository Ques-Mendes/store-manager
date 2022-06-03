const sinon = require('sinon');
const { express, expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Tests for productService layer', () => {
  describe('test the getProducts', () => {

    before(() => {
      sinon.stub(productsModel, 'getAll').resolves([[{}, {}], []])
    });
    after(() => {
      productsModel.getAll.restore();
    });

    it('Return the rigth data',async  () => {
      const response = await productsService.getProducts();
      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object')
    })
  })

  describe('Test fn get product by id', () => {
    describe('when id is not found', () => {

      before(() => {
        sinon.stub(productsModel, 'getById').resolves([[], []]);
      });
      after(() => {
        productsModel.getById.restore();
      });

      it('Return an object with error mssage "Product not found"', async () => {
        const id = 1;
        const response = await productsService.getProductById(id);
        expect(response).to.be.an('object');
        expect(response).to.includes.all.keys('error', 'message');
        expect(response.message).to.be.equal('Product not found');
      });
    });

    describe('when id is found', () => {

      const product = { "id": 1, "name": "productX", "quantity": 2 };
      before(() => {
        sinon.stub(productsModel, 'getById').resolves([[product], []]);
      });
      after(() => {
        productsModel.getById.restore();
      });

      it('Return an object with the right data', async () => {
        const id = 1;
        const response = await productsService.getProductById(id);
        expect(response).to.be.an('object');
        expect(response).to.includes.all.keys('id', 'name', 'quantity');
      });
    });    
  });

  describe('Test fn create product', () => {
    describe('When product already exists', () => {

      before(() => {
        sinon.stub(productsModel, 'getProductByName').resolves([[{}, {}], []])
        sinon.stub(productsModel, 'getProductByName').resolves([{ insertId: 1 }]);
      });
      after(() => {
        productsModel.getProductByName.restore();
        productsModel.createProduct.restore();
      });

      it('Return an obj with error messase "Product already exists"', async () => {
        const received = { name: 'name', quantity: 10 };
        const response = await productsService.createProduct(received);
        expect(response).to.be.an('object');
      });
    });
  });

    describe('Test fn update product', () => {
    describe('When id is found', () => {

      before(() => {
        sinon.stub(productsModel, 'updateProduct').resolves([[{}, {}], []])
      });
      after(() => {
        productsModel.updateProduct.restore();
      });

      it('Return the rigth data', async () => {
        const received = { name: 'name', quantity: 10, id: 1 };
        const response = await productsService.updateProduct(received);
        expect(response).to.be.an('object');
      });
    });
  });
  
});
const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Tests for saleService layer', () => {
  describe('Test fn getSales', () => {

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves([[{}, {}], []]);
    });
    after(() => {
      salesModel.getAll.restore();
    });

    it('Return an array with the rigth data', async () => {
      const response = await salesService.getSales();
      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
    });
  });

  describe('test fn get by id', () => {
    describe('when id is not found', () => {

    before(() => {
      sinon.stub(salesModel, 'getById').resolves([[], []]);
    });
    after(() => {
      salesModel.getById.restore();
    });

    it('Return an object with an error message "Sale not found"', async () => {
      const id = 1;
      const response = await salesService.getSaleById(id);
      expect(response).to.be.an('object');
      expect(response).to.includes.all.keys('error', 'message');
      expect(response.message).to.be.equal('Sale not found');
    });
    });

    describe('When id is found',() => {
      const sale = { "date": "2022-05-26T00:38:03.000Z", "productId": 2, "quantity": 2 };
      before(() => {
        sinon.stub(salesModel, 'getById').resolves([[sale], []]);
      });
      after(() => {
        salesModel.getById.restore();
      });

      it('Return an array with the right data', async () => {
        const id = 1;
        const response = await salesService.getSaleById(id);
        expect(response).to.be.an('array');
        expect(response[0]).to.includes.all.keys('date', 'productId', 'quantity');
      });
    });
  });

  describe('test fn create sale', () => {

    before(() => {
      sinon.stub(salesModel, 'createSale').resolves([{ insertId: 1 }]);
      sinon.stub(salesModel, 'createSalesProducts').resolves([[{}], [{}]]);
    });
    after(() => {
      salesModel.createSale.restore();
      salesModel.createSalesProducts.restore();
    });

    const sales = [
      {
      "productId": 1,
      "quantity": 2
      },
      {
      "productId": 2,
      "quantity": 5
      }
    ]

    it('Return an obj with the rigth data', async () => {
      const response = await salesService.createSale(sales);
      expect(response).to.be.an('object');
      expect(response).to.includes.all.keys('id', 'itemsSold');
      expect(response.id).to.be.equal(1);
      expect(response.itemsSold).to.be.equal(sales);
    })      
  })

  describe('Tests fn update sale', () => {
    describe('When id is not found', () => {

    before(() => {
      sinon.stub(salesModel, 'getById').resolves([[], []]);
    });
    after(() => {
      salesModel.getById.restore();
    });

    it('Return a obj with error message "Sale not found"', async () => {
      const id = 1;
      const response = await salesService.updateSale(id, []);
      expect(response).to.be.an('object');
      expect(response).to.includes.all.keys('error', 'message');
      expect(response.message).to.be.equal('Sale not found');
    });    
    });

    describe('When id exists', () => {
      const sales = [
        {
          "productId": 1,
          "quantity": 6
        }
      ]

      before(() => {
        sinon.stub(salesModel, 'getById').resolves([[{}], []]);
        sinon.stub(salesModel, 'updateSale').resolves([{}]);
      });
      after(() => {
        salesModel.getById.restore();
        salesModel.updateSale.restore();
      });

      it('Return an obj with thr rigth data', async () => {
        const id = 1;
        const response = await salesService.updateSale(id, sales);
        expect(response).to.be.an('object');
        expect(response).to.includes.all.keys('saleId', 'itemUpdated');
        expect(response.saleId).to.be.equal(id);
        expect(response.itemUpdated).to.be.equal(sales);
      });
    });
  });
  
});
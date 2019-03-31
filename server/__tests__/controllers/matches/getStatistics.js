const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../../app');
const MatchModel = require('../../../models/match');

const endpoint = '/matches/statistics';
let matchAggregateStub;
beforeEach(() => {
  matchAggregateStub = sinon.stub(MatchModel, 'aggregate');
  matchAggregateStub.returns(new Promise((res, rej) => res()));
});

afterEach(() => {
  matchAggregateStub.restore();
});

it('Should use right query to get results', async done => {
  const expectedQuery = [
    {
      $unwind: '$winner'
    },
    {
      $group: {
        _id: '$winner',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ];
  await request(app).get(endpoint);
  expect(matchAggregateStub.calledWith(expectedQuery)).to.be.true;
  done();
});


it('Should return a 200', async done => {
  const response = await request(app).get(endpoint);
  expect(response.statusCode).to.equal(200);
  done();
});

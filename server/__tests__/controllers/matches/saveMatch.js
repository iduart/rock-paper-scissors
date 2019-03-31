const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('supertest');
const app = require('../../../app');
const MatchModel = require('../../../models/match');

jest.useFakeTimers();

const endpoint = '/matches';
const payload = {
  players: [{ name: 'iduart', score: 1 }, { name: 'laura', score: 2 }],
  winner: 'laura'
};
let matchCreateStub;
beforeEach(() => {
  matchCreateStub = sinon.stub(MatchModel, 'create');
  matchCreateStub.returns(new Promise((res, rej) => res()));
});

afterEach(() => {
  matchCreateStub.restore();
});

it('Should return a 500 when no players or winner is sent', async done => {
  const response = await request(app).post(endpoint);
  expect(response.statusCode).to.equal(500);
  done();
});

it('Should return a 500 when sending less than 2 players', async done => {
  const failPayload = {
    players: [{ name: 'iduart', score: 1 }],
    winner: 'iduart'
  };
  const response = await request(app)
    .post(endpoint)
    .send(failPayload);
  expect(response.statusCode).to.equal(500);
  done();
});

it('Should return a 200 when payload is right', async done => {
  const payload = {
    players: [{ name: 'iduart', score: 1 }, { name: 'laura', score: 2 }],
    winner: 'laura'
  };
  const response = await request(app)
    .post(endpoint)
    .send(payload);
  expect(response.statusCode).to.equal(200);
  done();
});

it('Should call create', async done => {
  await request(app)
    .post(endpoint)
    .send(payload);
  expect(matchCreateStub.calledOnce).to.be.true;
  done();
});

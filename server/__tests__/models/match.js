const expect = require('chai').expect;
const Match = require('../../models/match');

describe('Match Model', function() {
  it('should be invalid if players is empty', function(done) {
    const match = new Match();

    match.validate(function(err) {
      expect(err.errors.winner).to.exist;
      done();
    });
  });
});

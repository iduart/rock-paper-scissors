const MatchModel = require('../../models/match');

const saveMatch = async (req, res) => {
  try {
    let { players = [], winner = '' } = req.body;

    if (!players.length || players.length < 2 || !winner) {
      throw new Error();
    }

    players = players.map(p => ({ name: p.name.toLowerCase(), score: p.score }));
    winner = winner.toLowerCase();

    await MatchModel.create({
      date: Date.now,
      players,
      winner
    });
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

module.exports = saveMatch;

const MatchModel = require('../../models/match');

const getStatistics = async (req, res) => {
  try {
    const result = await MatchModel.aggregate([
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
    ]);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getStatistics;

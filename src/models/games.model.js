// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const playerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' }
  });

  const games = new Schema({
    board: [[String]],
    players: [playerSchema],
    turn: { type: Number, default: 0 }, // player index
    started: { type: Boolean, default: false },
    winnerId: { type: Schema.Types.ObjectId, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tie: { type: Boolean, default: false },
  });

  return mongooseClient.model('games', games);
};

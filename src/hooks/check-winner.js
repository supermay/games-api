// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('feathers-errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function checkWinner (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations

    // see if hook.data has { set: boolean}
    if (hook.data.set === undefined) return Promise.resolve(hook);

    console.log(`set stone ${hook.data.set}`);

    const { user } = hook.params;

    // see if user is a players
    return hook.app.service('games').get(hook.id)
      .return((game) => {
        const { players, turn,  stones } = game;
        const playerIds = players.map((p) => (p.userId.toString()));
        const joined = playerIds.includes(user._id.toString());
        const hasTurn = playerIds.indexOf(user._id.toString()) === true;
      });
// how to read syntax like !joined, this means if "not joined" is true?
    if (!joined) {
      throw new errors.Unprocessable('You are not a player in this game, so you cannot play here, but you can create your own game or join other games!')
    }

    if (!hasTurn) {
      throw new errors.Unprocessable('It\'s not your turn to set a stone!')
    }

    const newStone = board.map((c,s) => {
      if ( s === hook.data.set ) {
      // here we have to check rounds and turn, then make sure that occupied is assigned with the right color.
        return Object.assign({},c, { occupied: 'black'})
      }
    })







    return Promise.resolve(hook);
  };
};

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createGame (hook) {

    const { user } = hook.params;

    // assign the owner of the game
    hook.data.userId = user._id,
    // add the owner to the players, as the first player in the game
    hook.data.players = [{
      userId: user._id
    }];

    // Create a 15 * 15 empty board
    hook.data.board = Array(15).fill(Array(15).fill(''));

    return Promise.resolve(hook);
  };
};

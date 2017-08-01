const { authenticate } = require('feathers-authentication').hooks;

const createGame = require('../../hooks/create-game');

const joinGame = require('../../hooks/join-game');

const checkWinner = require('../../hooks/check-winner');

const populatePlayers = require('../../hooks/populate-players');

const setStone = require('../../hooks/set-stone');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createGame()],
    update: [joinGame(), checkWinner(), setStone()],
    patch: [joinGame(), checkWinner(), setStone()],
    remove: []
  },

  after: {
    all: [populatePlayers()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

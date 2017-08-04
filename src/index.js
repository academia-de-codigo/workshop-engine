var world = require('./world');
var prompt = require('./prompt');

module.exports = {
    world: world,
    prompt: prompt,
    createStage: world.stageFactory.create
};

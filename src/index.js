var world = require('./world');
var prompt = require('./prompt');
var banner = require('./banner');

module.exports = {
    world: world,
    prompt: prompt,
    createStage: world.stageFactory.create,
    showBanner: banner.show
};

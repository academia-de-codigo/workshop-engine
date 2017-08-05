var world = require('./world');
var prompt = require('./prompt');
var banner = require('./banner');

module.exports = {
    showBanner: banner.show,
    makeInputQuestion: prompt.makeInputQuestion,
    makeConfirmQuestion: prompt.makeConfirmQuestion,
    makeListQuestion: prompt.makeListQuestion,
    createStage: world.stageFactory.create,
    createWorld: function() {
        return world;
    }
};

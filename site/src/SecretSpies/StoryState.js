this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var StoryState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(StoryState, SecretSpies.GameState);

    var p = StoryState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("StoryState/background", assets.level.child("story/storyLine.png"));
        this.load.spritesheet("StoryState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "StoryState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
        var nextButton = this.add.labelButton(this.world.centerX + 175, 525, "StoryState/buttons", 
            {
                "font": "20px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.add("WorldMapState", new SecretSpies.WorldMapState());
                this.state.start("WorldMapState");
            }, 
            this, 0, 1, 2, 1);
        nextButton.setText("Play");
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.StoryState = StoryState;

})();
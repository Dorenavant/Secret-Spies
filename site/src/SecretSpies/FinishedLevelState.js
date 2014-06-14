this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var FinishedLevelState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(FinishedLevelState, SecretSpies.GameState);

    var p = FinishedLevelState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("FinishedLevelState/background", assets.level.child("finishedLevels/levelEnd.png"));
        this.load.spritesheet("FinishedLevelState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "FinishedLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
        var nextButton = this.add.labelButton(this.world.centerX + 100, 410, "FinishedLevelState/buttons", 
            {
                "font": "18px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.add("WorldMapState", new SecretSpies.WorldMapState());
                this.state.start("WorldMapState");
            }, 
            this, 0, 1, 2, 1);
        nextButton.setText("Back to Main Menu");
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.FinishedLevelState = FinishedLevelState;

})();
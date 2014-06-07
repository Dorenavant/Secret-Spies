this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var MountainLevelState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(MountainLevelState, SecretSpies.GameState);

    var p = MountainLevelState.prototype;

    p.preload = function() {
       var assets = SecretSpies.path.assets;
        this.load.image("MountainLevelState/background", assets.level.child("mountainLevel/mountainBackground.png"));
        this.load.spritesheet("MountainLevelState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "MountainLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.MountainLevelState = MountainLevelState;

})();
this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var AsiaState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(AsiaState, SecretSpies.GameState);

    var p = AsiaState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("AsiaState/background", assets.level.child("worldMap/asia.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "AsiaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.AsiaState = AsiaState;

})();
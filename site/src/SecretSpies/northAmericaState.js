this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var NorthAmericaState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(NorthAmericaState, SecretSpies.GameState);

    var p = NorthAmericaState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("NorthAmericaState/background", assets.level.child("worldMap/northAmerica.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "NorthAmericaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.NorthAmericaState = NorthAmericaState;

})();
this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var AfricaState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(AfricaState, SecretSpies.GameState);

    var p = AfricaState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("AfricaState/background", assets.level.child("worldMap/africa.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "AfricaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.AfricaState = AfricaState;

})();
this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var EuropeState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(EuropeState, SecretSpies.GameState);

    var p = EuropeState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("EuropeState/background", assets.level.child("worldMap/europe.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "EuropeState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.EuropeState = EuropeState;

})();
this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var WorldMapState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(WorldMapState, SecretSpies.GameState);

    var p = WorldMapState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
    }

    p.create = function() {
    
    }

    p.update = function() {
    }

    p.render = function() {
    
    }

    SecretSpies.WorldMapState = WorldMapState;

})();
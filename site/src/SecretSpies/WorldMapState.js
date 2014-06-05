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
        var arrNames = ["asia", "africa", "europe", "southAmerica", "northAmerica", "australia", "worldMap"];
        for (var i = 0; i < arrNames.length; ++i) {
        	this.load.image("WorldMapState/" + arrNames[i], assets.level.child("worldMap/" + arrNames[i] + ".png"));
        }
    }

    p.create = function() {
    	var background = this.objects["worldMap"] = this.add.sprite(0, 0, "WorldMapState/worldMap");
    	SecretSpies.scaler(background, "texture").scale(this.stage.bounds); 
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.WorldMapState = WorldMapState;

})();
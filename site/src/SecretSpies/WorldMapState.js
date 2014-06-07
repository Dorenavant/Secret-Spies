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
        this.load.spritesheet("WorldMapState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.spritesheet("WorldMapState/transparentPixel", assets.common.child("textures/transparentPixel.png"));
    }

    p.create = function() {
    	var background = this.objects["worldMap"] = this.add.sprite(0, 0, "WorldMapState/worldMap");
    	SecretSpies.scaler(background, "texture").scale(this.stage.bounds); 
    	background.inputEnabled = true;
    	background.input.pixelPerfectOver = true;
    	var button = this.add.labelButton(30, 30, "WorldMapState/buttons",  
    		{
                "font": "20px Arial", 
                "fill": "white"
            }, 
            function() {
            	this.state.add("ShopState", new SecretSpies.ShopState());
                this.state.start("ShopState");
            },
            this, 0, 1, 2, 1);
    	button.setText("Shop");
    	//var northAmericaClick = this.add.sprite(40, 40, "WorldMapState/transparentPixel",);
    }

    p.update = function() {
    }

    p.render = function() {
    	this.game.debug.spriteInputInfo(this.objects["worldMap"], 200, 200);
    }

    SecretSpies.WorldMapState = WorldMapState;

})();
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
        this.load.spritesheet("MainMenuState/buttons", assets.common.child("textures/buttons.png"), 186, 64);

    }

    p.create = function() {
    	var background = this.objects["worldMap"] = this.add.sprite(0, 0, "WorldMapState/worldMap");
    	SecretSpies.scaler(background, "texture").scale(this.stage.bounds); 
    	var button = this.add.labelButton(30, 30, "MainMenuState/buttons",  
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
    	var northAmericaClick = new Phaser.Rectangle(0, 120, 120, 120);
    }

    p.update = function() {
    }

    p.render = function() {
    	
    }

    SecretSpies.WorldMapState = WorldMapState;

})();
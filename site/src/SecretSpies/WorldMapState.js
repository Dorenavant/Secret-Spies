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
        var arrNames = ["asia", "africa", "europe", "northAmerica", "worldMap"];
        for (var i = 0; i < arrNames.length; ++i) {
        	this.load.image("WorldMapState/" + arrNames[i], assets.level.child("worldMap/" + arrNames[i] + ".png"));
        }
        this.load.spritesheet("WorldMapState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.spritesheet("WorldMapState/transparentPixel", assets.common.child("textures/transparentPixel.png"));
    }

    p.create = function() {
    	var background = this.objects["worldMap"] = this.add.sprite(0, 0, "WorldMapState/worldMap");
    	SecretSpies.scaler(background, "texture").scale(this.stage.bounds); 
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
    	var northAmericaClick = this.add.sprite(15, 115, "WorldMapState/transparentPixel");
    	northAmericaClick.inputEnabled = true;
    	northAmericaClick.input.useHandCursor = true;
    	northAmericaClick.height = 275
    	northAmericaClick.width = 265
    	northAmericaClick.input.onDown.addOnce(northAmericaclicked, this);
    	function northAmericaclicked() {
    		
    	}
    }

    p.update = function() {
    }

    p.render = function() {
    
    }

    SecretSpies.WorldMapState = WorldMapState;

})();
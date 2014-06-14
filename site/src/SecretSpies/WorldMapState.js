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
        this.load.image("WorldMapState/worldMap", assets.level.child("worldMap/worldMap.png"));
        this.load.spritesheet("WorldMapState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.spritesheet("WorldMapState/transparentPixel", assets.common.child("textures/transparentPixel.png"));
    }

    p.create = function() {
    	var background = this.objects["worldMap"] = this.add.sprite(0, 0, "WorldMapState/worldMap");
    	SecretSpies.scaler(background, "texture").scale(this.stage.bounds); 
    	var shopButton = this.add.labelButton(30, 30, "WorldMapState/buttons",  
    		{
                "font": "18px Arial", 
                "fill": "white"
            }, 
            function() {
            	this.state.add("ShopState", new SecretSpies.ShopState());
                this.state.start("ShopState");
            },
            this, 0, 1, 2, 1);
    	shopButton.setText("Shop");

    	var backButton = this.add.labelButton(625, 30, "WorldMapState/buttons",
    		{
    			"font": "18px Arial",
    			"fill": "white"
    		},
    		function() {
    			this.state.start("MainMenuState");
    		},
    		this, 0, 1, 2, 1);
    	backButton.setText("Back to MainMenu");

    	var northAmericaClick = this.add.sprite(15, 115, "WorldMapState/transparentPixel");
    	northAmericaClick.inputEnabled = true;
    	northAmericaClick.input.useHandCursor = true;
    	northAmericaClick.width = 275
    	northAmericaClick.height = 215
    	northAmericaClick.events.onInputDown.add(northAmericaClicked, this);
    	function northAmericaClicked() {
    		this.state.add("NorthAmericaState", new SecretSpies.NorthAmericaState());
            this.state.start("NorthAmericaState");
    	}

    	var europeClick = this.add.sprite(365, 150, "WorldMapState/transparentPixel");
    	europeClick.inputEnabled = true;
    	europeClick.input.useHandCursor = true;
    	europeClick.width = 110
    	europeClick.height = 175	
    	europeClick.events.onInputDown.add(europeClicked, this);
    	function europeClicked() {
    		this.state.add("EuropeState", new SecretSpies.EuropeState());
            this.state.start("EuropeState");
    	}

    	var asiaClick = this.add.sprite(550, 150, "WorldMapState/transparentPixel");
    	asiaClick.inputEnabled = true;
    	asiaClick.input.useHandCursor = true;
    	asiaClick.width = 175
    	asiaClick.height = 225	
    	asiaClick.events.onInputDown.add(asiaClicked, this);
    	function asiaClicked() {
    		this.state.add("AsiaState", new SecretSpies.AsiaState());
            this.state.start("AsiaState");
    	}

    	var africaClick = this.add.sprite(365, 275, "WorldMapState/transparentPixel");
    	africaClick.inputEnabled = true;
    	africaClick.input.useHandCursor = true;
    	africaClick.width = 185
    	africaClick.height = 275	
    	africaClick.events.onInputDown.add(africaClicked, this);
    	function africaClicked() {
    		this.state.add("AfricaState", new SecretSpies.AfricaState());
            this.state.start("AfricaState");
    	}
    }

    p.update = function() {
    }

    p.render = function() {
    
    }

    SecretSpies.WorldMapState = WorldMapState;

})();
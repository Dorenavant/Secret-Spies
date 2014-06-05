this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var MainMenuState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(MainMenuState, SecretSpies.GameState);

    var p = MainMenuState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("MainMenuState/background", assets.level.child("mainMenu/introscreen.png"));
        this.load.spritesheet("MainMenuState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "MainMenuState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
        var button = this.add.labelButton(this.world.centerX + 95, 400, "MainMenuState/buttons", 
            {
                "font": "20px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.add("WorldMapState", new SecretSpies.WorldMapState());
                this.state.start("WorldMapState");
            }, 
            this, 0, 1, 2, 1);
        button.setText("Play");
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.MainMenuState = MainMenuState;

})();
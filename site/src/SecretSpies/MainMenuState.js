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
        var playButton = this.add.labelButton(this.world.centerX + 110, 420, "MainMenuState/buttons", 
            {
                "font": "20px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.add("WorldMapState", new SecretSpies.WorldMapState());
                this.state.start("WorldMapState");
            }, 
            this, 0, 1, 2, 1);
        playButton.setText("Play");
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.MainMenuState = MainMenuState;

})();
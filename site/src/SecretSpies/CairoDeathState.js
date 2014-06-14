this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var CairoDeathState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(CairoDeathState, SecretSpies.GameState);

    var p = CairoDeathState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("CairoDeathState/background", assets.level.child("deathScreen/deathScreen.png"));
        this.load.spritesheet("CairoDeathState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "CairoDeathState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
        var continueButton = this.add.labelButton(100, 500, "CairoDeathState/buttons", 
            {
                "font": "18px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.start("CairoLevelState");
            }, 
            this, 0, 1, 2, 1);
        continueButton.setText("Try Again");
        var backButton = this.add.labelButton(575, 500, "CairoDeathState/buttons", 
            {
                "font": "18px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.add("WorldMapState", new SecretSpies.WorldMapState());
                this.state.start("WorldMapState");
            }, 
            this, 0, 1, 2, 1);
        backButton.setText("Back to Main Menu");
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.CairoDeathState = CairoDeathState;

})();
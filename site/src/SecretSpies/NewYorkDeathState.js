this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var NewYorkDeathState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(NewYorkDeathState, SecretSpies.GameState);

    var p = NewYorkDeathState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("NewYorkDeathState/background", assets.level.child("deathScreen/deathScreen.png"));
        this.load.spritesheet("NewYorkDeathState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "NewYorkDeathState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
        var continueButton = this.add.labelButton(100, 500, "NewYorkDeathState/buttons", 
            {
                "font": "18px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.start("NewYorkLevelState");
            }, 
            this, 0, 1, 2, 1);
        continueButton.setText("Try Again");
        var backButton = this.add.labelButton(575, 500, "NewYorkDeathState/buttons", 
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

    SecretSpies.NewYorkDeathState = NewYorkDeathState;

})();
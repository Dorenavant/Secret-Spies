this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var AsiaState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(AsiaState, SecretSpies.GameState);

    var p = AsiaState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("AsiaState/background", assets.level.child("worldMap/asia.png"));
        this.load.spritesheet("AsiaState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.image("AsiaState/beijing", assets.level.child("worldMap/beijing.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "AsiaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);

         var backButton = this.add.labelButton(100, 30, "AsiaState/buttons",  
            {
                "font": "20px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.start("WorldMapState");
            },
            this, 0, 1, 2, 1);
        backButton.setText("Back");

        var beijing = this.objects["beijing"] = this.add.sprite(440, 200, "AsiaState/beijing");
        beijing.width = 125;
        beijing.height = 125;
        beijing.inputEnabled = true;
        beijing.input.useHandCursor = true;
        beijing.events.onInputDown.add(beijingClicked, this);
        function beijingClicked() {
            this.state.add("BeijingLevelState", new SecretSpies.BeijingLevelState);
            this.state.start("BeijingLevelState");
        } 
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.AsiaState = AsiaState;

})();
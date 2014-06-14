this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var AfricaState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(AfricaState, SecretSpies.GameState);

    var p = AfricaState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("AfricaState/background", assets.level.child("worldMap/africa.png"));
        this.load.spritesheet("AfricaState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.image("AfricaState/cairo", assets.level.child("worldMap/cairo.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "AfricaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  

        var backButton = this.add.labelButton(180, 30, "AfricaState/buttons",  
            {
                "font": "20px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.start("WorldMapState");
            },
            this, 0, 1, 2, 1);
        backButton.setText("Back");
        
        var cairo = this.objects["cairo"] = this.add.sprite(375, 50, "AfricaState/cairo");
        cairo.width = 125;
        cairo.height = 125; 
        cairo.inputEnabled = true;
        cairo.input.useHandCursor = true;
        cairo.events.onInputDown.add(cairoClicked, this);
        function cairoClicked() {
            this.state.add("CairoLevelState", new SecretSpies.CairoLevelState);
            this.state.start("CairoLevelState");
        }  
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.AfricaState = AfricaState;

})();
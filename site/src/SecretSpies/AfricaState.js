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
        this.load.image("AfricaState/cairo", assets.level.child("worldMap/cairo.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "AfricaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  

        var cairo = this.objects["cairo"] = this.add.sprite(375, 50, "AfricaState/cairo");
        cairo.width = 125;
        cairo.height = 125; 
        cairo.inputEnabled = true;
        cairo.input.useHandCursor = true;
        cairo.events.onInputDown.add(cairoClicked, this);
        function cairoClicked() {
            this.state.add("MountainLevelState", new SecretSpies.MountainLevelState);
            this.state.start("MountainLevelState");
        }  
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.AfricaState = AfricaState;

})();
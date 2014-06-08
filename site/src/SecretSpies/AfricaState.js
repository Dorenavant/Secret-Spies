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
        this.load.image("AfricaState/agra", assets.level.child("worldMap/agra.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "AfricaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  

        var agra = this.objects["agra"] = this.add.sprite(400, 100, "AfricaState/agra");
        agra.width = 125;
        agra.height = 125; 
        agra.inputEnabled = true;
        agra.input.useHandCursor = true;
        agra.events.onInputDown.add(agraClicked, this);
        function agraClicked() {
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
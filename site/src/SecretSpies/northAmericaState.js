this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var NorthAmericaState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(NorthAmericaState, SecretSpies.GameState);

    var p = NorthAmericaState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("NorthAmericaState/background", assets.level.child("worldMap/northAmerica.png"));
        this.load.image("NorthAmericaState/iqaluit", assets.level.child("worldMap/iqaluit.png"));  
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "NorthAmericaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  

        var iqaluit = this.objects["iqaluit"] = this.add.sprite(420, 110, "NorthAmericaState/iqaluit");
        iqaluit.width = 125;
        iqaluit.height = 125;
        iqaluit.inputEnabled = true;
        iqaluit.input.useHandCursor = true;
        iqaluit.events.onInputDown.add(iqaluitClicked, this);
        function iqaluitClicked() {
            this.state.add("MountainLevelState", new SecretSpies.MountainLevelState);
            this.state.start("MountainLevelState");
        }   
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.NorthAmericaState = NorthAmericaState;

})();
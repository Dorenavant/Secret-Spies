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
        this.load.image("NorthAmericaState/newYork", assets.level.child("worldMap/newYork.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "NorthAmericaState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  

        var iqaluit = this.objects["iqaluit"] = this.add.sprite(425, 110, "NorthAmericaState/iqaluit");
        iqaluit.width = 125;
        iqaluit.height = 125;
        iqaluit.inputEnabled = true;
        iqaluit.input.useHandCursor = true;
        iqaluit.events.onInputDown.add(iqaluitClicked, this);
        function iqaluitClicked() {
            this.state.add("IqaluitLevelState", new SecretSpies.IqaluitLevelState);
            this.state.start("IqaluitLevelState");
        }   

        var newYork = this.objects["newYork"] = this.add.sprite(350, 250, "NorthAmericaState/newYork");
        newYork.width = 125;
        newYork.height = 125;
        newYork.inputEnabled = true;
        newYork.input.useHandCursor = true;
        newYork.events.onInputDown.add(newYorkClicked, this);
        function newYorkClicked() {
            this.state.add("IqaluitLevelState", new SecretSpies.IqaluitLevelState);
            this.state.start("IqaluitLevelState");
        }   
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.NorthAmericaState = NorthAmericaState;

})();
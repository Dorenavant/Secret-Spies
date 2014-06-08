this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var EuropeState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(EuropeState, SecretSpies.GameState);

    var p = EuropeState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("EuropeState/background", assets.level.child("worldMap/europe.png"));
        this.load.image("EuropeState/london", assets.level.child("worldMap/london.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "EuropeState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  

        var london = this.objects["london"] = this.add.sprite(175, 240, "EuropeState/london");
        london.width = 125;
        london.height = 125;
        london.inputEnabled = true;
        london.input.useHandCursor = true;
        london.events.onInputDown.add(londonClicked, this);
        function londonClicked() {
            this.state.add("MountainLevelState", new SecretSpies.MountainLevelState);
            this.state.start("MountainLevelState");
        }   
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.EuropeState = EuropeState;

})();
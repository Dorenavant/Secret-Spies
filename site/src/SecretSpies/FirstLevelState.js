this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var FirstLevelState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(FirstLevelState, SecretSpies.GameState);

    var p = FirstLevelState.prototype;

    p.preload = function() {
       
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "FirstLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
        var button = this.add.labelButton(20, 200, "FirstLevelState/buttons", 
            {
                "font": "20px Arial", 
                "fill": "white"
            }, 
            function() {
                console.log("swag");
            }, 
            this, 0, 1, 2, 1);
        button.setText("Swag Button");
        button.width = 400
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.FirstLevelState = FirstLevelState;

})();
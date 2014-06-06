this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var ShopState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(ShopState, SecretSpies.GameState);

    var p = ShopState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        this.load.image("ShopState/background", assets.level.child("Shop/shop.png"));
        this.load.spritesheet("ShopState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "ShopState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  
        var button = this.add.labelButton(20, 200, "ShopState/buttons", 
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

    SecretSpies.ShopState = ShopState;

})();
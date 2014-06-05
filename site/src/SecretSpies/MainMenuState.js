this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var MainMenuState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(MainMenuState, SecretSpies.GameState);

    var p = MainMenuState.prototype;

    p.preload = function() {
        var assets = SecretSpies.path.assets;
        console.log(assets);
        this.load.image("MainMenuState/background", assets.level.child("mainMenu/introscreen.png"));
        this.load.image("MainMenuState/buttons", assets.common.child("textures/buttons.png"));
        // this.load.spritesheet("MainMenuState/buttons", assets.common.child("textures/buttons.png"), 558, 64);
        this.load.image("MainMenuState/world-s-screen"), assets.level.child("mainMenu/world-map-screen.png");
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "MainMenuState/background");
        SecretSpies.resizeSpriteTo(background, this.stage.bounds.width, this.stage.bounds.height);  
        var button;
        button = this.add.button(this.world.centerX + 95, 400, "buttons", actionOnClick, this, 2, 1 , 0);
        function actionOnClick () {
            background = this.objects["world-map-screen"];
        }
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.MainMenuState = MainMenuState;

})();
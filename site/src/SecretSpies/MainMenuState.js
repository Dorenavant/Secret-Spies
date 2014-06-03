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
        this.load.image("MainMenuState/background", assets.level.child("mainMenu/background.png"));
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "MainMenuState/background");
        SecretSpies.resizeSpriteTo(background, this.stage.bounds.width, this.stage.bounds.height);
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.MainMenuState = MainMenuState;

})();
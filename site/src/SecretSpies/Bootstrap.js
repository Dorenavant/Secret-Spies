this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var Bootstrap = {};

    var s = Bootstrap;

    s.run = function(GAMEDIV, VIEWPORT_X, VIEWPORT_Y, COMMON_DIR, LEVEL_DIR) {

        var path = SecretSpies.path;

        path.assets.common = path.getPath(COMMON_DIR);
        path.assets.level = path.getPath(LEVEL_DIR);

        var preload = function() {
        }

        var create = function() {
            SecretSpies.game.state.add("MainMenuState", new SecretSpies.MainMenuState());
            SecretSpies.game.state.start("MainMenuState");
        }

        var update = function() {
        }

        var render = function() {
        }

        SecretSpies.game = new Phaser.Game(
            VIEWPORT_X, 
            VIEWPORT_Y, 
            Phaser.CANVAS, 
            GAMEDIV, 
            {
                preload: preload, 
                create: create, 
                update: update,
                render: render
            }
        );
    }

    SecretSpies.Bootstrap = Bootstrap;

})();
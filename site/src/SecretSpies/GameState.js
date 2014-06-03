this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var GameState = function() {
    }

    var p = GameState.prototype;

    p.preload = p.create = p.update = p.render = function() {
    }

    SecretSpies.GameState = GameState;

})();
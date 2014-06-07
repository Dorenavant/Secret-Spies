this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    var MountainLevelState = function() {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(MountainLevelState, SecretSpies.GameState);

    var p = MountainLevelState.prototype;

    p.preload = function() {
       var assets = SecretSpies.path.assets;
        this.load.image("MountainLevelState/background", assets.level.child("mountainLevel/mountainBackground.png"));
        this.load.spritesheet("MountainLevelState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.image("MountainLevelState/blocks", assets.level.child("mountainLevel/mountainBlock.png"));
        this.load.spritesheet("MountainLevelState/character", assets.common.child(""))
    }

    p.create = function() {
        var background = this.objects["background"] = this.add.sprite(0, 0, "MountainLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);  

        this.physics.startSystem(Phaser.Physics.ARCADE);

        for(var x = 0; x < 1024; x += 50) {
            var block = this.objects["blocks"] = this.add.sprite(x, 575, "MountainLevelState/blocks");
            this.physics.enable(block, Phaser.Physics.ARCADE);
            block.width = 50;
            block.height = 50;
            block.body.collideWorldBounds = true;
            block.body.checkCollision.left = false;
            block.body.checkCollision.right = false;
            block.body.checkCollision.down = false;
            block.body.immovable = true;
        }

        var character = this.objects
    }

    p.update = function() {
    }

    p.render = function() {
    }

    SecretSpies.MountainLevelState = MountainLevelState;

})();
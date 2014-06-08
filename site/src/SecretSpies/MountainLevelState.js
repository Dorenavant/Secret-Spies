this.SecretSpies = this.SecretSpies || {};

(function (undefined) {
    "use strict";

    var MountainLevelState = function () {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(MountainLevelState, SecretSpies.GameState);

    var p = MountainLevelState.prototype;

    p.preload = function () {
        var assets = SecretSpies.path.assets;
        this.load.image("MountainLevelState/background", assets.level.child("mountainLevel/mountainBackground.png"));
        this.load.spritesheet("MountainLevelState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.image("MountainLevelState/blocks", assets.level.child("mountainLevel/mountainBlock.png"));
        this.load.spritesheet("MountainLevelState/character", assets.common.child("textures/character.png"), 27, 40);
        this.load.spritesheet("MountainLevelState/coins", assets.common.child("textures/coins.png"), 32, 32);

        this.load.tilemap("MountainLevelState/map", assets.level.child("mountainLevel/level.json"), null, Phaser.Tilemap.TILED_JSON);
        this.load.image("MountainLevelState/map/tiles", assets.common.child("textures/kennyTiles.png"));

    }

    p.create = function () {
        //this.world.setBounds(0, 0, 12000, 4000);
        
        this.objects["facing"] = "left";
        this.objects["jumpTimer"] = 0;

        var background = this.objects["background"] = this.add.sprite(0, 0, "MountainLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);
        background.fixedToCamera = true;

        var map = this.objects["map"] = this.add.tilemap("MountainLevelState/map");
        console.log(map);
        map.addTilesetImage("tiles", "MountainLevelState/map/tiles");

        var ground = this.objects["ground"] = map.createLayer("tiles");
        ground.resizeWorld();

        var coins = this.objects["coins"] = this.add.group();
        coins.enableBody = true;

        map.createFromObjects("coins", 157, "MountainLevelState/coins", 0, true, false, coins);
        coins.callAll("animations.add", "animations", "spin", [0, 1, 2, 3, 4, 5], 10, true);
        coins.callAll("animations.play", "animations", "spin");
        
        map.setCollision([23, 38], true, ground);
        map.setCollision([157], true, ground);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.gravity.y = 550;

        var character = this.objects["character"] = this.add.sprite(25, 3000, "MountainLevelState/character");
        SecretSpies.scaler(character, "texture").scale(48, 64);
        this.physics.enable(character, Phaser.Physics.ARCADE);
        character.body.bounce.y = 0.2;
        character.body.collideWorldBounds = true;
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('turn', [4], 20, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);

        this.camera.follow(character);

        var movementInput = this.objects["movementInput"] = this.input.keyboard.createCursorKeys();
        var jumpButton = this.objects["jumpButton"] = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    p.update = function () {
        var facing = this.objects["facing"];
        var jumpTimer = this.objects["jumpTimer"];
        var character = this.objects["character"];
        var movementInput = this.objects["movementInput"];
        var jumpButton = this.objects["jumpButton"];

        this.physics.arcade.collide(character, this.objects["ground"],
            function (character, block) {
                this.onFloor = true;
            },
            function() {
                return true;
            },
            character
        );
        
        // this.physics.arcade.collide(character, this.objects["ground"]);

        character.body.velocity.x = 0;

        if (character.body.velocity.y > 400) {
            character.body.velocity.y = 400;
        }

        if (movementInput.left.isDown) {
            character.body.velocity.x = -300;

            if (facing != 'left') {
                character.animations.play('left');
                this.objects["facing"] = 'left';
            }
        } else if (movementInput.right.isDown) {
            character.body.velocity.x = 300;

            if (facing != 'right') {
                character.animations.play('right');
                this.objects["facing"] = 'right';
            }
        } else {
            if (facing != 'idle') {
                character.animations.stop();

                if (facing == 'left') {
                    character.frame = 0;
                } else {
                    character.frame = 5;
                }

                this.objects["facing"] = 'idle';
            }
        }

        if ((movementInput.up.isDown || jumpButton.isDown) && (character.onFloor || character.body.onFloor()) && this.game.time.now > jumpTimer) {
            character.body.velocity.y = -300;
            jumpTimer = this.game.time.now + 750;
            character.onFloor = false;
        }
    }
    p.render = function () {
    }

    SecretSpies.MountainLevelState = MountainLevelState;

})();
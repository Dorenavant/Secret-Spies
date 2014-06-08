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

        this.objects["facing"] = "left";
        this.objects["jumpTimer"] = 0;

        var background = this.objects["background"] = this.add.sprite(0, 0, "MountainLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);
        background.fixedToCamera = true;

        this.physics.startSystem(Phaser.Physics.P2JS);

        var map = this.objects["map"] = this.add.tilemap("MountainLevelState/map");
        map.addTilesetImage("tiles", "MountainLevelState/map/tiles");

        var ground = this.objects["ground"] = map.createLayer("tiles");
        ground.resizeWorld();

        var coinsCollisionGroup = this.physics.p2.createCollisionGroup();
        var characterCollisionGroup = this.physics.p2.createCollisionGroup();

        this.physics.p2.updateBoundsCollisionGroup();

        var coins = this.objects["coins"] = this.add.group();
        coins.enableBody = true;
        coins.physicsBodyType = Phaser.Physics.P2JS;

        map.createFromObjects("coins", 157, "MountainLevelState/coins", 0, true, false, coins);
        coins.callAll("animations.add", "animations", "spin", [0, 1, 2, 3, 4, 5], 10, true);
        coins.callAll("animations.play", "animations", "spin");
        coins.forEach(function(coin){
            //console.log(coin.body);
            coin.body.static = true;
        }, this);
        
        map.setCollision([23, 38], true, ground);
        map.setCollision([157], true, ground);

        this.physics.p2.convertTilemap(map, ground);
        this.physics.p2.gravity.y = 400;

        var character = this.objects["character"] = this.add.sprite(25, 3300, "MountainLevelState/character");
        SecretSpies.scaler(character, "texture").scale(48, 64);
        this.physics.p2.enable(character);
        this.physics.p2.setBoundsToWorld(true, true, true, true, false);

        character.body.collideWorldBounds = true;
        character.body.fixedRotation = true;
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('turn', [4], 20, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);

        function resetJump() {
            console.log("wank");
        }

        map.setTileIndexCallback([23, 38], resetJump);

        this.camera.follow(character);

        var movementInput = this.objects["movementInput"] = this.input.keyboard.createCursorKeys();
        var jumpButton = this.objects["jumpButton"] = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    function hitCoin() {
        console.log("wanka");
    }

    p.update = function () {
        var facing = this.objects["facing"];
        var jumpTimer = this.objects["jumpTimer"];
        var character = this.objects["character"];
        var movementInput = this.objects["movementInput"];
        var jumpButton = this.objects["jumpButton"];

        if (character.position.y > 3380) {
            this.state.start("MountainLevelState");
        }

        character.body.velocity.x = 0;

        if (movementInput.left.isDown) {
            character.body.moveLeft(250);
            if (facing != 'left') {
                character.animations.play('left');
                this.objects["facing"] = 'left';
            }
        } else if (movementInput.right.isDown) {
            character.body.moveRight(250);
            if (facing != 'right') {
                character.animations.play('right');
                this.objects["facing"] = 'right';
            }
        } else {
            character.body.velocity.x = 0;
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
        if (jumpButton.isDown && this.time.now > jumpTimer && checkIfCanJump.call(this)) {
            character.body.moveUp(250);
            jumpTimer = this.time.now + 750;
        }


        function checkIfCanJump() {

            var yAxis = p2.vec2.fromValues(0, 1);
            var result = false;

            for (var i = 0; i < this.physics.p2.world.narrowphase.contactEquations.length; i++) {
                var c = this.physics.p2.world.narrowphase.contactEquations[i];
                if (c.bodyA === character.body.data || c.bodyB === character.body.data) {
                    var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                    if (c.bodyA === character.body.data) d *= -1;
                    if (d > 0.5) result = true;
                }
            }
            return result;
        }

    }
    p.render = function () {}

    SecretSpies.MountainLevelState = MountainLevelState;

})();
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
        this.load.spritesheet("MountainLevelState/character", assets.common.child("textures/character.png"), 32, 48);
    }

    p.create = function () {
        this.world.setBounds(0, 0, 12000, 4000);
        
        this.objects["facing"] = "left";
        this.objects["jumpTimer"] = 0;

        var background = this.objects["background"] = this.add.sprite(0, 0, "MountainLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);
        background.fixedToCamera = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.physics.arcade.gravity.y = 500;

        var g = this.objects["blocks"] = this.add.group();

        for (var x = 0; x < 1600; x += 40) {
            var block = this.add.sprite(x, 3960, "MountainLevelState/blocks");
            SecretSpies.scaler(block, "texture").scale(40, 40);
            this.physics.enable(block, Phaser.Physics.ARCADE);
            block.body.collideWorldBounds = true;
            g.add(block);
            block.body.immovable = true;
            block.body.allowGravity = false;
        }

        for(var x = 400; x < 720; x += 40) {
            var block = this.add.sprite(x, 3880, "MountainLevelState/blocks");
            SecretSpies.scaler(block, "texture").scale(40, 40);
            this.physics.enable(block, Phaser.Physics.ARCADE);
            block.body.collideWorldBounds = true;
            g.add(block);
            block.body.immovable = true;
            block.body.allowGravity = false;
        }

        for(var x = 80; x < 240; x += 40) {
            var block = this.add.sprite(x, 3800, "MountainLevelState/blocks");
            SecretSpies.scaler(block, "texture").scale(40, 40);
            this.physics.enable(block, Phaser.Physics.ARCADE);
            block.body.collideWorldBounds = true;
            g.add(block);
            block.body.immovable = true;
            block.body.allowGravity = false;
        }

        for(var y = 400; y > ; y -= 40) {
            var block = this.add.sprite(80, y, "MountainLevelState/blocks");
            SecretSpies.scaler(block, "texture").scale(40, 40);
            this.physics.enable(block, Phaser.Physics.ARCADE);
            block.body.collideWorldBounds = true;
            g.add(block);
            block.body.immovable = true;
            block.body.allowGravity = false;
        }

        for(var x = 880; x < 920; x += 40) {
            var block = this.add.sprite(x, 475, "MountainLevelState/blocks");
            SecretSpies.scaler(block, "texture").scale(40, 40);
            this.physics.enable(block, Phaser.Physics.ARCADE);
            block.body.collideWorldBounds = true;
            g.add(block);
            block.body.immovable = true;
            block.body.allowGravity = false;
        }

        var character = this.objects["character"] = this.add.sprite(25, 500, "MountainLevelState/character");
        this.physics.enable(character, Phaser.Physics.ARCADE);
        character.body.bounce.y = 0.2;
        character.body.collideWorldBounds = true;
        character.body.setSize(20, 32, 5, 16);
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
        var jumpButton = this.objects["jumpButton"];
        var character = this.objects["character"];
        var movementInput = this.objects["movementInput"];
        this.physics.arcade.collide(character, this.objects["blocks"],
            function (character, block) {
                character.onFloor = true;
            });
        character.body.velocity.x = 0;

        if (movementInput.left.isDown) {
            character.body.velocity.x = -150;

            if (facing != 'left') {
                character.animations.play('left');
                this.objects["facing"] = 'left';
            }
        } else if (movementInput.right.isDown) {
            character.body.velocity.x = 150;

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

        if (jumpButton.isDown && character.onFloor && this.game.time.now > jumpTimer) {
            character.body.velocity.y = -250;
            jumpTimer = this.game.time.now + 750;
            character.onFloor = false;
        }
        if (jumpButton.isDown && character.body.onFloor() && this.game.time.now > jumpTimer) {
            character.body.velocity.y = -500;
            jumpTimer = this.game.time.now + 750;
        }
    }
    p.render = function () {
    }

    SecretSpies.MountainLevelState = MountainLevelState;

})();
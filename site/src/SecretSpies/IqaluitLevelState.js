this.SecretSpies = this.SecretSpies || {};

(function (undefined) {
    "use strict";

    var IqaluitLevelState = function () {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(IqaluitLevelState, SecretSpies.GameState);

    var p = IqaluitLevelState.prototype;

    p.preload = function () {
        var assets = SecretSpies.path.assets;
        this.load.image("IqaluitLevelState/background", assets.level.child("iqaluitLevel/iqaluitBackground.png"));
        this.load.image("IqaluitLevelState/ui/defaultButton", assets.common.child("ui/defaultButton.png"));
        this.load.spritesheet("IqaluitLevelState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.spritesheet("IqaluitLevelState/character", assets.common.child("textures/character.png"), 27, 40);
        this.load.spritesheet("IqaluitLevelState/coins", assets.common.child("textures/coins.png"), 32, 32);
        this.load.spritesheet("IqaluitLevelState/mob", assets.common.child("textures/originalMonster.png"), 39, 40);
        this.load.image("IqaluitLevelState/questionBoxes", assets.common.child("textures/questionBox.png"));

        this.load.tilemap("IqaluitLevelState/map", assets.level.child("iqaluitLevel/iqaluitLevel.json"), null, Phaser.Tilemap.TILED_JSON);
        this.load.image("IqaluitLevelState/map/tiles", assets.common.child("textures/kennyTiles.png"));

    }

    p.create = function () {

        this.objects["facing"] = "left";
        this.objects["jumpTimer"] = 0;

        var background = this.objects["background"] = this.add.sprite(0, 0, "IqaluitLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);
        background.fixedToCamera = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        //this.physics.setImpactEvents(true);

        var map = this.objects["map"] = this.add.tilemap("IqaluitLevelState/map");
        map.addTilesetImage("tiles", "IqaluitLevelState/map/tiles");

        var ground = this.objects["ground"] = map.createLayer("tiles");
        ground.resizeWorld();

        /*var coinsCollisionGroup = this.physics.p2.createCollisionGroup();
        var characterCollisionGroup = this.physics.p2.createCollisionGroup();
        var tilesCollisionGroup = this.physics.p2.createCollisionGroup();
        var questionBoxCollisionGroup = this.physics.p2.createCollisionGroup();
        var mobCollisionGroup = this.physics.p2.createCollisionGroup();*/

        //this.physics.p2.updateBoundsCollisionGroup();

        /*var coins = this.objects["coins"] = this.add.group();
        coins.enableBody = true;
        coins.physicsBodyType = Phaser.Physics.P2JS;

        map.createFromObjects("coins", 157, "IqaluitLevelState/coins", 0, true, false, coins);
        coins.callAll("animations.add", "animations", "spin", [0, 1, 2, 3, 4, 5], 10, true);
        coins.callAll("animations.play", "animations", "spin");
        coins.forEach(function(coin){
            coin.body.static = true;
            coin.body.setCircle(20);
            coin.body.setCollisionGroup(coinsCollisionGroup);
            coin.body.collides(characterCollisionGroup);
            coin.body.collides(tilesCollisionGroup);
        }, this);*/
        
        map.setCollision([23, 38], true, ground);
        map.setCollision([157], true, ground);
        map.setCollision([163], true, ground);

        //var mapTiles = this.physics.convertTilemap(map, ground);

        var character = this.objects["character"] = this.add.sprite(25, 3000, "IqaluitLevelState/character");
        SecretSpies.scaler(character, "texture").scale(48, 64);
        this.physics.enable(character);
        this.physics.setBoundsToWorld(true, true, true, true, false);

        //character.body.setCollisionGroup(characterCollisionGroup);

        /*for (var i = 0; i < mapTiles.length; i++) {
            var tileBody = mapTiles[i];
            tileBody.setCollisionGroup(tilesCollisionGroup);
            tileBody.collides(characterCollisionGroup);
            tileBody.collides(mobCollisionGroup);
        }

        var mob  = this.objects["mob"] = this.add.sprite(150, 2000, "IqaluitLevelState/mob");
        SecretSpies.scaler(mob, "texture").scale(117, 120);
        this.physics.p2.enable(mob);
        this.physics.p2.setBoundsToWorld(true, true, true, true, false);
        mob.body.fixedRotation = true;
        mob.body.setCollisionGroup(mobCollisionGroup);*/

        this.physics.arcade.gravity.y = 300;
        this.physics.enable(character);

        /*var questionBoxes = this.objects["questionBoxes"] = this.add.group();
        questionBoxes.enableBody = true;
        questionBoxes.physicsBodyType = Phaser.Physics.P2JS;

        map.createFromObjects("questionBoxes", 163, "IqaluitLevelState/questionBoxes", 0, true, false, questionBoxes);
        questionBoxes.forEach(function(questionBox){
            questionBox.body.static = true;
            questionBox.body.setCollisionGroup(questionBoxCollisionGroup);
            questionBox.body.collides(characterCollisionGroup);
            questionBox.body.collides(tilesCollisionGroup);
        }, this);

        character.body.collides(tilesCollisionGroup);
        character.body.collides(coinsCollisionGroup, hitCoin, this);
        character.body.collides(questionBoxCollisionGroup, hitQuestionBox, this);
        character.body.collides(mobCollisionGroup, hitMob, this);*/
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('turn', [4], 20, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);
        character.collideWorldBounds = true;

        /*mob.body.collides(characterCollisionGroup, hitMob, this);
        mob.body.collides(tilesCollisionGroup);
        mob.animations.add("walk");
        mob.animations.play("walk", 10, true);*/

        this.camera.follow(character);

        var movementInput = this.objects["movementInput"] = this.input.keyboard.createCursorKeys();
        var jumpButton = this.objects["jumpButton"] = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        /*var coinCounter = this.objects["coinCounter"] = 0;
        
        var coinCounterDisplay = this.objects["coinCounterDisplay"] = this.add.text(20, 20, this.objects["coinCounter"],
            {
                "font": "45px monospace", 
                "fill": "#FFFFFF",
                "align": "center",
                "stroke": "#000000",
                "strokeThickness": 3
            }
        );
        coinCounterDisplay.fixedToCamera = true;*/
        
        var backButton = this.add.labelButton(600, 20, "IqaluitLevelState/buttons", 
            {
                "font": "20px Arial", 
                "fill": "white"
            }, 
            function() {
                this.state.start("WorldMapState");
            }, 
            this, 0, 1, 2, 1);
        backButton.fixedToCamera = true;
        backButton.setText("Back");
    }

    /*function hitCoin(body1, body2) {
        var coinCounter = ++this.objects["coinCounter"];
        this.objects["coinCounterDisplay"].setText(coinCounter.toString());
        body2.sprite.kill();
    }

    function hitQuestionBox(body1, body2) {
        body2.sprite.kill();
    }

    function hitMob() {
        this.state.start("IqaluitLevelState");
    }*/

    p.update = function () {
        var facing = this.objects["facing"];
        var jumpTimer = this.objects["jumpTimer"];
        var character = this.objects["character"];
        var movementInput = this.objects["movementInput"];
        var jumpButton = this.objects["jumpButton"];
        var ground = this.objects["ground"];
        //var coinCounter = this.objects["coinCounter"];
        //var coinCounterDisplay = this.objects["coinCounterDisplay"];
        //var mob = this.objects["mob"];

        //mob.body.moveRight(50);

        //coinCounterDisplay.setText(coinCounter);

        this.physics.arcade.collide(character, ground);

        if (!character.inWorld) {
            this.state.start("IqaluitLevelState");
        }

        if (character.position.y > 3400) {
            this.state.start("IqaluitLevelState");
        }

        character.body.velocity.x = 0;

        if (movementInput.left.isDown) {
            character.body.velocity.x = -200;
            if (facing != 'left') {
                character.animations.play('left');
                this.objects["facing"] = 'left';
            }
        } else if (movementInput.right.isDown) {
            character.body.velocity.x = 200;
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

        if (movementInput.down.isDown) {
            character.body.velocity.y = 200;
        }
         
        if ((jumpButton.isDown || movementInput.up.isDown) && this.time.now > jumpTimer && character.body.onFloor()) {
            character.body.velocity.y = -300;
            jumpTimer = this.time.now + 750;
        }

    }
    p.render = function () {}

    SecretSpies.IqaluitLevelState = IqaluitLevelState;

})();
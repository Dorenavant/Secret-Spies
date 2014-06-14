this.SecretSpies = this.SecretSpies || {};

(function (undefined) {
    "use strict";

    var NewYorkLevelState = function () {
        this.objects = {};
        this._cachedValues = {};
    }

    SecretSpies.extend(NewYorkLevelState, SecretSpies.GameState);

    var p = NewYorkLevelState.prototype;

    p.preload = function () {
        var assets = SecretSpies.path.assets;
        this.load.image("NewYorkLevelState/background", assets.level.child("newYorkLevel/newYorkBackground.png"));
        this.load.image("NewYorkLevelState/ui/defaultButton", assets.common.child("ui/defaultButton.png"));
        this.load.spritesheet("NewYorkLevelState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.spritesheet("NewYorkLevelState/character", assets.common.child("textures/character.png"), 27, 40);
        this.load.spritesheet("NewYorkLevelState/coins", assets.common.child("textures/coins.png"), 32, 32);
        this.load.image("NewYorkLevelState/questionBoxes", assets.common.child("textures/questionBox.png"));

        this.load.tilemap("NewYorkLevelState/map", assets.level.child("newYorkLevel/newYorkLevel.json"), null, Phaser.Tilemap.TILED_JSON);
        this.load.image("NewYorkLevelState/map/tiles", assets.common.child("textures/kennyTiles.png"));

    }

    p.create = function () {

        this.objects["facing"] = "left";
        this.objects["jumpTimer"] = 0;

        var background = this.objects["background"] = this.add.sprite(0, 0, "NewYorkLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);
        background.fixedToCamera = true;

        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true);

        var map = this.objects["map"] = this.add.tilemap("NewYorkLevelState/map");
        map.addTilesetImage("tiles", "NewYorkLevelState/map/tiles");

        var ground = this.objects["ground"] = map.createLayer("tiles");
        ground.resizeWorld();

        var coinsCollisionGroup = this.physics.p2.createCollisionGroup();
        var characterCollisionGroup = this.physics.p2.createCollisionGroup();
        var tilesCollisionGroup = this.physics.p2.createCollisionGroup();
        var questionBoxCollisionGroup = this.physics.p2.createCollisionGroup();

        this.physics.p2.updateBoundsCollisionGroup();

        var coins = this.objects["coins"] = this.add.group();
        coins.enableBody = true;
        coins.physicsBodyType = Phaser.Physics.P2JS;

        map.createFromObjects("coins", 157, "NewYorkLevelState/coins", 0, true, false, coins);
        coins.callAll("animations.add", "animations", "spin", [0, 1, 2, 3, 4, 5], 10, true);
        coins.callAll("animations.play", "animations", "spin");
        coins.forEach(function(coin){
            coin.body.static = true;
            coin.body.setCircle(20);
            coin.body.setCollisionGroup(coinsCollisionGroup);
            coin.body.collides(characterCollisionGroup);
            coin.body.collides(tilesCollisionGroup);
        }, this);
        
        map.setCollision([137, 122], true, ground);
        map.setCollision([157], true, ground);
        map.setCollision([163], true, ground);

        var mapTiles = this.physics.p2.convertTilemap(map, ground);

        var character = this.objects["character"] = this.add.sprite(25, 2600, "NewYorkLevelState/character");
        SecretSpies.scaler(character, "texture").scale(48, 64);
        this.physics.p2.enable(character);
        this.physics.p2.setBoundsToWorld(true, true, true, true, false);
        character.body.fixedRotation = true;
        character.body.setCollisionGroup(characterCollisionGroup);

        for (var i = 0; i < mapTiles.length; i++) {
            var tileBody = mapTiles[i];
            tileBody.setCollisionGroup(tilesCollisionGroup);
            tileBody.collides(characterCollisionGroup);
            tileBody.collides(coinsCollisionGroup);
        }

        this.physics.p2.gravity.y = 500;

        var questionBoxes = this.objects["questionBoxes"] = this.add.group();
        questionBoxes.enableBody = true;
        questionBoxes.physicsBodyType = Phaser.Physics.P2JS;

        map.createFromObjects("questionBoxes", 163, "NewYorkLevelState/questionBoxes", 0, true, false, questionBoxes);
        questionBoxes.forEach(function(questionBox){
            questionBox.body.static = true;
            questionBox.body.setCollisionGroup(questionBoxCollisionGroup);
            questionBox.body.collides(characterCollisionGroup);
            questionBox.body.collides(tilesCollisionGroup);
        }, this);

        character.body.collides(tilesCollisionGroup);
        character.body.collides(coinsCollisionGroup, hitCoin, this);
        character.body.collides(questionBoxCollisionGroup, hitQuestionBox, this);
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('turn', [4], 20, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);  

        this.camera.follow(character);

        var movementInput = this.objects["movementInput"] = this.input.keyboard.createCursorKeys();
        var jumpButton = this.objects["jumpButton"] = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var coinCounter = this.objects["coinCounter"] = 0;
        
        var coinCounterDisplay = this.objects["coinCounterDisplay"] = this.add.text(20, 20, this.objects["coinCounter"],
            {
                "font": "45px monospace", 
                "fill": "#FFFFFF",
                "align": "center",
                "stroke": "#000000",
                "strokeThickness": 3
            }
        );
        coinCounterDisplay.fixedToCamera = true;
        
         var backButton = this.add.labelButton(600, 20, "NewYorkLevelState/buttons", 
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

    function hitCoin(body1, body2) {
        var coinCounter = ++this.objects["coinCounter"];
        this.objects["coinCounterDisplay"].setText(coinCounter.toString());
        body2.sprite.kill();
    }

    function hitQuestionBox(body1, body2) {

        body2.sprite.kill();
    }
    p.update = function () {
        var facing = this.objects["facing"];
        var jumpTimer = this.objects["jumpTimer"];
        var character = this.objects["character"];
        var movementInput = this.objects["movementInput"];
        var jumpButton = this.objects["jumpButton"];
        var coinCounter = this.objects["coinCounter"];
        var coinCounterDisplay = this.objects["coinCounterDisplay"];

        coinCounterDisplay.setText(coinCounter);

        if (!character.inWorld) {
            this.state.start("NewYorkLevelState");
        }

        if (character.position.y > 3400) {
            this.state.add("NewYorkDeathState", new SecretSpies.NewYorkDeathState());
            this.state.start("NewYorkDeathState");
        }

        if (character.position.x > 20578) {
            this.state.add("FinishedLevelState", new SecretSpies.FinishedLevelState());
            this.state.start("FinishedLevelState");
        }

        if(character.position.x < 0) {
            this.state.start("NewYorkLevelState");
        }

        character.body.velocity.x = 0;

        if (movementInput.left.isDown) {
            character.body.moveLeft(400);
            if (facing != 'left') {
                character.animations.play('left');
                this.objects["facing"] = 'left';
            }
        } else if (movementInput.right.isDown) {
            character.body.moveRight(400);
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
            character.body.moveDown(400);
        }
        
        if ((jumpButton.isDown || movementInput.up.isDown) && this.time.now > jumpTimer && checkIfCanJump.call(this)) {
            character.body.moveUp(400);
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

    SecretSpies.NewYorkLevelState = NewYorkLevelState;

})();
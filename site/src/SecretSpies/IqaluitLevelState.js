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
        this.load.spritesheet("IqaluitLevelState/buttons", assets.common.child("textures/buttons.png"), 186, 64);
        this.load.spritesheet("IqaluitLevelState/character", assets.common.child("textures/character.png"), 27, 40);
        this.load.spritesheet("IqaluitLevelState/coins", assets.common.child("textures/coins.png"), 32, 32);
        this.load.spritesheet("IqaluitLevelState/mob", assets.common.child("textures/originalMonster.png"), 39, 40);
        this.load.image("IqaluitLevelState/questionBoxes", assets.common.child("textures/questionBox.png"));

        this.load.image("IqaluitLevelState/ui/questionPanel", assets.common.child("ui/mediumMenu.png"));
        this.load.image("IqaluitLevelState/ui/questionPanel", assets.common.child("ui/defaultButton.png"));
        this.load.image("IqaluitLevelState/ui/correctAnswer", assets.common.child("ui/correctAnswer.png"));
        this.load.image("IqaluitLevelState/ui/wrongAnswer", assets.common.child("ui/wrongAnswer.png"));
        this.load.image("IqaluitLevelState/ui/defaultAnswer", assets.common.child("ui/defaultAnswer.png"));

        this.load.tilemap("IqaluitLevelState/map", assets.level.child("iqaluitLevel/iqaluitLevel.json"), null, Phaser.Tilemap.TILED_JSON);
        this.load.image("IqaluitLevelState/map/tiles", assets.common.child("textures/kennyTiles.png"));

    }

    p.create = function () {

        this.objects["facing"] = "left";
        this.objects["jumpTimer"] = 0;

        var background = this.objects["background"] = this.add.sprite(0, 0, "IqaluitLevelState/background");
        SecretSpies.scaler(background, "texture").scale(this.stage.bounds);
        background.fixedToCamera = true;

        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true);

        var map = this.objects["map"] = this.add.tilemap("IqaluitLevelState/map");
        map.addTilesetImage("tiles", "IqaluitLevelState/map/tiles");

        var ground = this.objects["ground"] = map.createLayer("tiles");
        ground.resizeWorld();

        var coinsCollisionGroup = this.physics.p2.createCollisionGroup();
        var characterCollisionGroup = this.physics.p2.createCollisionGroup();
        var tilesCollisionGroup = this.physics.p2.createCollisionGroup();
        var questionBoxCollisionGroup = this.physics.p2.createCollisionGroup();
        var mobCollisionGroup = this.physics.p2.createCollisionGroup();

        this.physics.p2.updateBoundsCollisionGroup();

        var coins = this.objects["coins"] = this.add.group();
        coins.enableBody = true;
        coins.physicsBodyType = Phaser.Physics.P2JS;

        map.createFromObjects("coins", 157, "IqaluitLevelState/coins", 0, true, false, coins);
        coins.callAll("animations.add", "animations", "spin", [0, 1, 2, 3, 4, 5], 10, true);
        coins.callAll("animations.play", "animations", "spin");
        coins.forEach(function(coin) {
            coin.body.static = true;
            coin.body.setCircle(20);
            coin.body.setCollisionGroup(coinsCollisionGroup);
            coin.body.collides(characterCollisionGroup);
            coin.body.collides(tilesCollisionGroup);
        }, this);
        
        map.setCollision([23, 38], true, ground);
        map.setCollision([157], true, ground);
        map.setCollision([163], true, ground);

        var mapTiles = this.physics.p2.convertTilemap(map, ground);

        var character = this.objects["character"] = this.add.sprite(25, 3300, "IqaluitLevelState/character");
        SecretSpies.scaler(character, "texture").scale(48, 64);
        this.physics.p2.enable(character);
        this.physics.p2.setBoundsToWorld(true, true, true, true, false);
        character.body.fixedRotation = true;
        character.body.setCollisionGroup(characterCollisionGroup);

        for (var i = 0; i < mapTiles.length; i++) {
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
        mob.body.setCollisionGroup(mobCollisionGroup);

        this.physics.p2.gravity.y = 500;

        var questionBoxes = this.objects["questionBoxes"] = this.add.group();
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
        character.body.collides(mobCollisionGroup, hitMob, this);
        character.animations.add('left', [0, 1, 2, 3], 10, true);
        character.animations.add('turn', [4], 20, true);
        character.animations.add('right', [5, 6, 7, 8], 10, true);

        mob.body.collides(characterCollisionGroup, hitMob, this);
        mob.body.collides(tilesCollisionGroup);
        mob.animations.add("walk");
        mob.animations.play("walk", 10, true);

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

    function hitCoin(body1, body2) {
        var coinCounter = ++this.objects["coinCounter"];
        this.objects["coinCounterDisplay"].setText(coinCounter.toString());
        body2.sprite.kill();
    }

    function hitQuestionBox(body1, body2) {
        var questionPanel = this.add.sprite(this.world.centerX, this.world.centerY, "IqaluitLevelState/ui/questionPanel");
        questionPanel.fixedToCamera = true;
        questionPanel.anchor.setTo(0.5);
        questionPanel.visible = true;
        var buttonGroup = this.add.group();
        var genButton = function(text, correctAnswer) {
            var b = this.add.labelSprite(0, 0, "IqaluitLevelState/ui/defaultAnswer",
                {
                    "font": "20px Arial",
                    "fill": "white"
                });
            b.setText(text);
            buttonGroup.add(b);
            SecretSpies.scaler(b, "texture").scale(478, 478);
            var text = this.add.text(
                this.world.centerX, 
                this.world.centerY - 478,
                (num1 + " " + op + " " + num2).toString(),
                {
                    "font": "20px Arial",
                    "fill": "white"
                });
            text.anchor.set(0.5);
            text.fixedToCamera = true;

            buttonGroup.add(text);

            var inputHandler = function(b) {
                var scale = {x: b.scale.x, y: b.scale.y};
                b.inputEnabled = true;
                b.loadAppropriateTextureForAnswer = function() {
                    this.loadTexture("IqaluitLevelState" + (correctAnswer ? "/ui/correctAnswer" : "/ui/wrongAnswer"));
                }
                b.events.onInputDown.add(function() {
                    buttonGroup.setAll("inputEnabled", false);
                    buttonGroup.callAll("loadAppropriateTextureForAnswer", null);
                    if (correctAnswer) {
                        this.objects["score"] += rules["map"]["coins"]["correctScore"];
                        this.objects["scoreDisplay"].setText(this.objects["score"].toString());
                        buttonGroup.forEach(function(obj) {
                            if (b !== obj) {
                                smallenAndKill.call(this, obj, 500);
                            }
                        }, this);
                        smallenAndKill.call(this, b, 500, function() {
                            smallenAndKill.call(this, questionPanel, 500, function() {
                                var gTween2 = this.add.tween(g).to({alpha: 0}, 200, Phaser.Easing.Linear.None, false, 0, 0, false);
                                gTween2.onComplete.add(function() {
                                    this._inQuestion = false;
                                    ball.body.moves = true;
                                }, this);
                                gTween2.start();
                            });
                        })
                    } else {
                        this.objects["backButton"].inputEnabled = false;
                        var questionFailPanelRules = rules["ui"]["questionFailPanel"];
                        var s = questionFailPanelRules["size"];
                        var t = questionFailPanelRules["text"];
                        var st = questionFailPanelRules["style"];

                        var failPanel = this.add.sprite(this.world.centerX, this.world.centerY, params.name + "/ui/questionFailPanel");
                        failPanel.visible = false;
                        SecretSpies.scaler(failPanel, "texture").scale(1, 1);

                        var sQ = {
                            x: s["width"] / failPanel.texture.width, 
                            y: s["height"] / failPanel.texture.width
                        }

                        failPanel.fixedToCamera = true;
                        failPanel.anchor.setTo(0.5);
                        failPanel.visible = true;
                        var failPanelTween = this.add.tween(failPanel.scale).to(sQ, 300, Phaser.Easing.Sinusoidal.InOut, false, 0, 0, false);
                        failPanelTween.onComplete.add(function() {
                            var gameOverText = this.add.text(
                                this.world.centerX, 
                                this.world.centerY, 
                                t, 
                                st
                                );
                            gameOverText.anchor.set(0.5);
                            gameOverText.fixedToCamera = true;
                            failPanel.inputEnabled = true;
                            failPanel.events.onInputDown.add(function() {
                                failPanel.inputEnabled = false;
                                var tween = this.add.tween(this.world).to({alpha: 0}, 1000, Phaser.Easing.Quadratic.InOut, false, 0, 0, false);
                                tween.onComplete.add(function() {
                                    this.state.add("MainMenuState", new SecretSpies.MainMenuState());
                                    this.state.start("MainMenuState");
                                }, this);
                                tween.start();
                            }, this);
                        }, this);
failPanelTween.start();
}
}, this);
}
inputHandler.call(this, b);
return b
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var operators = {
    "+": function(a, b) {return a + b},
    "-": function(a, b) {return a - b},
    "*": function(a, b) {return a * b},
    "/": function(a, b) {return a / b},
    "array": ["+", "-", "*", "/"]
}

var num1, num2, op, answer;
var op = operators.array[this.rnd.integerInRange(0, 3)];
var temp;

switch (op) {
    case "+": 
    num1 = this.rnd.integerInRange(0, 499);
    num2 = this.rnd.integerInRange(0, 499);
    break;
    case "-":
    num1 = this.rnd.integerInRange(0, 999);
    num2 = this.rnd.integerInRange(0, 999);
    temp = Math.max(num1, num2);
    num2 = Math.min(num1, num2);
    num1 = temp;
    break;
    case "*":
    num1 = this.rnd.integerInRange(0, 25);
    num2 = this.rnd.integerInRange(0, 25);
    break;
    case "/":
    do {
        num1 = this.rnd.integerInRange(0, 250);
        num2 = this.rnd.integerInRange(0, 250);
        temp = Math.max(num1, num2);
        num2 = Math.min(num1, num2);
        num1 = temp;
    } while ((num1 % num2) != 0)
    break;
}

answer = operators[op](num1, num2);
var wrongAnswers = [
];

for (var i = 0; i < 3; ++i) {
    outerloop:
    for (;;) {
        var rnd = this.rnd.integerInRange(-7, 7);
        if (rnd == 0) {
            continue outerloop;
        }
        var test = answer + rnd;
        if (test < 0 && op != "-") {
            continue outerloop;
        }
        for (var j = 0; j < wrongAnswers.length; ++j) {
            if (wrongAnswers[j] == test) {
                continue outerloop;
            }
        }
        wrongAnswers.push(test);
        break;
    }
}

var buttonArray = [
genButton.call(this, answer.toString(), true), 
genButton.call(this, wrongAnswers[0].toString(), false), 
genButton.call(this, wrongAnswers[1].toString(), false),
genButton.call(this, wrongAnswers[2].toString(), false)
];
buttonArray = shuffleArray(buttonArray);

var b;

b = buttonArray[0];
b.x = this.world.centerX - 1.2 * 478;
b.y = this.world.centerY + 478;
b.fixedToCamera = true;

b = buttonArray[1];
b.x = this.world.centerX + 0.2 * 478;
b.y = this.world.centerY + 478;
b.fixedToCamera = true;

b = buttonArray[2];
b.x = this.world.centerX - 1.2 * 478;
b.y = this.world.centerY + 2.5 * 478;
b.fixedToCamera = true;

b = buttonArray[3];
b.x = this.world.centerX + 0.2 * 478;
b.y = this.world.centerY+ 2.5 * 478;
b.fixedToCamera = true;
body2.sprite.kill();
}

function hitMob() {
    this.state.add("IqaluitDeathState", new SecretSpies.IqaluitDeathState());
    this.state.start("IqaluitDeathState");
}

p.update = function () {
    var facing = this.objects["facing"];
    var jumpTimer = this.objects["jumpTimer"];
    var character = this.objects["character"];
    var movementInput = this.objects["movementInput"];
    var jumpButton = this.objects["jumpButton"];
    var coinCounter = this.objects["coinCounter"];
    var coinCounterDisplay = this.objects["coinCounterDisplay"];
    var mob = this.objects["mob"];

    mob.body.moveRight(50);
    if (mob.position.x > 500) {
        mob.position.x = 25;
        mob.position.y = 2000;
    }

    coinCounterDisplay.setText(coinCounter);

    if (!character.inWorld) {
        this.state.start("IqaluitLevelState");
    }

    if (character.position.y > 3400) {
        this.state.add("IqaluitDeathState", new SecretSpies.IqaluitDeathState());
        this.state.start("IqaluitDeathState");
    }

    if (character.position.x > 20578) {
        this.state.add("FinishedLevelState", new SecretSpies.FinishedLevelState());
        this.state.start("FinishedLevelState");
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

    SecretSpies.IqaluitLevelState = IqaluitLevelState;

})();
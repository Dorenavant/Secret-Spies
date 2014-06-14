this.SecretSpies = this.SecretSpies || {};

(function(undefined) {
    "use strict";

    SecretSpies.extend = function extend(child, parent) {
        if (Object.prototype.toString.call(parent) === "[object Array]") {
            parent.forEach(function(pa) { extend(child, pa); });
        }
        var _extend = function(child, parent, excludeSuper) {
            for (var i in parent) {
                if (excludeSuper && i == "super") {
                    continue;
                }
                child[i] = parent[i];
            }
        }
        if (typeof child === "function" && typeof parent === "function") {
            _extend(child.prototype, parent.prototype);
            _extend(child, parent, true);
            child.super = child.super || [];
            child.super.push(parent);
            return;
        }
        _extend(child, parent);
    }

    var LabelButton = function(game, x, y, key, style, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
        Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
        style = style || {};

        this.text = new Phaser.Text(game, 0, 0, "Label", style);
        this.addChild(this.text);
        this.setText("Label");
    }

    LabelButton.prototype = Object.create(Phaser.Button.prototype);
    LabelButton.prototype.constructor = LabelButton;

    var LabelSprite = function(game, x, y, key, style, frame) {
        Phaser.Sprite.call(this, game, x, y, key, frame);
        style = style || {};

        this.text = new Phaser.Text(game, 0, 0, "Label", style);
        this.addChild(this.text);
        this.setText("Label");
    }

    LabelSprite.prototype = Object.create(Phaser.Sprite.prototype);
    LabelSprite.prototype.constructor = LabelSprite;

    LabelButton.prototype.setText = LabelSprite.prototype.setText = function(text) {
        this.text.setText(text);
        this.text.x = Math.floor((this.width - this.text.width) * 0.5);
        this.text.y = Math.floor((this.height - this.text.height) * 0.5);
    }

    SecretSpies.ui = SecretSpies.ui || {};

    SecretSpies.ui.LabelButton = LabelButton;
    SecretSpies.ui.LabelSprite = LabelSprite;

    Phaser.GameObjectFactory.prototype.labelButton = function (x, y, key, style, 
        callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {

        if (typeof group === 'undefined') { group = this.world; }

        return group.add(new SecretSpies.ui.LabelButton(this.game, x, y, key, style, 
            callback, callbackContext, overFrame, outFrame, downFrame, upFrame));
    }

    Phaser.GameObjectFactory.prototype.labelSprite = function (x, y, key, style, frame, group) {

        if (typeof group === 'undefined') { group = this.world; }

        var create = function(x, y, key, style, frame, exists) {
            if (typeof exists === 'undefined') { exists = true; }

            var child = new SecretSpies.ui.LabelSprite(this.game, x, y, key, frame);

            if (this.enableBody) {
                this.game.physics.enable(child, this.physicsBodyType);
            }

            child.exists = exists;
            child.visible = exists;
            child.alive = exists;

            this.addChild(child);

            child.z = this.children.length;

            if (child.events) {
                child.events.onAddedToGroup.dispatch(child, this);
            }

            if (this.cursor === null) {
                this.cursor = child;
            }

            return child;
        }
        return create.call(group, x, y, key, style, frame);
    }

    // var LabelButton = function(game, x, y, key, style, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
    //     Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    //     style = style || {};

    //     this.text = new Phaser.Text(game, 0, 0, "Label", style);
    //     this.addChild(this.text);
    //     this.setText("Label");
    // }

    // LabelButton.prototype = Object.create(Phaser.Button.prototype);
    // LabelButton.prototype.constructor = LabelButton;

    // var LabelSprite = function(game, x, y, key, style, frame) {
    //     Phaser.Sprite.call(this, game, x, y, key, frame);

    //     this.text = new Phaser.Text(game, 0, 0, "Label", style);
    //     this.addChild(this.text);
    //     this.setText("Label");
    // }

    // LabelSprite.prototype = Object.create(Phaser.Sprite.prototype);
    // LabelSprite.prototype.constructor = LabelSprite;

    // LabelButton.prototype.setText = LabelSprite.prototype.setText = function(text) {
    //     this.text.setText(text);
    //     this.text.x = Math.floor((this.width - this.text.width) * 0.5);
    //     this.text.y = Math.floor((this.height - this.text.height) * 0.5);
    // }

    // SecretSpies.ui = SecretSpies.ui || {};

    // SecretSpies.ui.LabelButton = LabelButton;
    // SecretSpies.ui.LabelSprite = LabelSprite;

    // Phaser.GameObjectFactory.prototype.labelButton = function (x, y, key, style, 
    //     callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {

    //     if (typeof group === 'undefined') { group = this.world; }

    //     return group.add(new SecretSpies.ui.LabelButton(this.game, x, y, key, style, 
    //         callback, callbackContext, overFrame, outFrame, downFrame, upFrame));
    // }

    // Phaser.GameObjectFactory.prototype.labelSprite = function (x, y, key, style, frame, group) {

    //     if (typeof group === 'undefined') { group = this.world; }

    //     var create = function(x, y, key, style, frame, exists) {
    //         if (typeof exists === 'undefined') { exists = true; }

    //         var child = new SecretSpies.ui.LabelSprite(this.game, x, y, key, frame);

    //         if (this.enableBody) {
    //             this.game.physics.enable(child, this.physicsBodyType);
    //         }

    //         child.exists = exists;
    //         child.visible = exists;
    //         child.alive = exists;

    //         this.addChild(child);

    //         child.z = this.children.length;

    //         if (child.events) {
    //             child.events.onAddedToGroup.dispatch(child, this);
    //         }

    //         if (this.cursor === null) {
    //             this.cursor = child;
    //         }

    //         return child;
    //     }
    //     return create.call(group, x, y, key, style, frame);
    // }


    SecretSpies.scaler = function(obj, subObj) {
        var subObjAvailable = (typeof subObj !== "undefined");
        return {
            scale: function(w, h) {
                if (typeof h === "undefined") {
                    h = w.height || w.y;
                    w = w.width || w.x;
                }
                if (subObjAvailable) {
                    var sub = SecretSpies.property.get(obj, subObj);
                    obj.scale.setTo(w / (sub.width || sub.x), h / (sub.height || sub.y));
                } else {
                    obj.scale.setTo(w, h);
                }
                
            }
        }
    }

    SecretSpies.property = SecretSpies.property || {};

    SecretSpies.property.get = function(obj, prop) {
        prop = prop.split(".");
        for (var i = 0; i < prop.length; ++i) {
            obj = obj[prop[i]];
            if (typeof obj === "undefined") {
                return undefined;
            }
        }
        return obj;
    }

    SecretSpies.property.set = function(obj, prop, value) {
        prop = prop.split(".");
        for (var i = 0; i < prop.length - 1; ++i) {
            var tmp = obj;
            obj = obj[prop[i]];
            if (typeof obj === "undefined") {
                obj = tmp[prop[i]] = {};
            }
        }
        obj[prop[prop.length - 1]] = value;
    }

    SecretSpies.property.apply = function(obj, props, force) {
        for (var propName in props) {
            if (force || typeof SecretSpies.property.get(obj, propName) !== "undefined") {
                SecretSpies.property.set(obj, propName, props[propName]);
            }
        }
    }

    SecretSpies.path = SecretSpies.path || {};

    SecretSpies.path.subPath = function(basePath, relPath) {
        return (basePath.charAt(basePath.length - 1) == '/' ? basePath + relPath : basePath + "/" + relPath);
    }

    SecretSpies.path.getPath = function getPath(dir) {
        var rv = new String(dir);
        rv.child = function(relPath) {
            return getPath(SecretSpies.path.subPath(this, relPath));
        }
        return rv;
    }

    SecretSpies.path.assets = SecretSpies.path.assets || {};

})();
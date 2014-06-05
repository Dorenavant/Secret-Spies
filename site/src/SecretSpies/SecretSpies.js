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

    var LabelButton = function(game, x, y, key, style, callback, callbackContext, overFrame, outFrame, downFrame, upFrame) {
        Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);

        style = style || {
            "font": "10px Arial",
            "fill": "black"
        };

        this.label = new Phaser.Text(game, 0, 0, "Label", style);
        this.addChild(this.label);
        this.setText("Label");
    }

    LabelButton.prototype = Object.create(Phaser.Button.prototype);
    LabelButton.prototype.constructor = LabelButton;

    LabelButton.prototype.setText = function(label) {
        this.label.setText(label);
        this.label.x = Math.floor((this.width - this.label.width) * 0.5);
        this.label.y = Math.floor((this.height - this.label.height) * 0.5);
    }

    SecretSpies.ui = SecretSpies.ui || {};

    SecretSpies.ui.LabelButton = LabelButton;

    Phaser.GameObjectFactory.prototype.labelButton = function (x, y, key, style, 
        callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {

        if (typeof group === 'undefined') { group = this.world; }

        return group.add(new SecretSpies.ui.LabelButton(this.game, x, y, key, style, 
            callback, callbackContext, overFrame, outFrame, downFrame, upFrame));

    }

    var physicsTypeMap = {
        "p2": Phaser.Physics.P2JS,
        "arcade": Phaser.Physics.ARCADE,
        "ninja": Phaser.Physics.NINJA
    }

    SecretSpies.mapPhysicsType = function(name) {
        return physicsTypeMap[name.toLowerCase()];
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
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

    SecretSpies.resizeSpriteTo = function(s, w, h) {
        s.scale.setTo(w / s.texture.width, h / s.texture.height);
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
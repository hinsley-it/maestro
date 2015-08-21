/**
 * ref.js
 * Copyright (c) 2015 Carter Hinsley
 * MIT License
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window).
        root.returnExports = factory();
  }
}(this, function () {
    exports = {};

    exports.new = function (x) {
        return [x];
    };

    exports.get = function (x) {
        return x[0];
    };

    exports.set = function(x, new_value) {
        return x[0] = new_value;
    };
}));

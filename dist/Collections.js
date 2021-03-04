"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionList = exports.ElementCollection = void 0;
var Network_Elements_1 = require("./Network_Elements");
var lodash_1 = require("lodash");
var ElementCollection = /** @class */ (function () {
    function ElementCollection(arr) {
        var _this = this;
        this.elements = [];
        this.transceivers = [];
        this.roadms = [];
        this.amplifiers = [];
        this.fibers = [];
        if (arr) {
            arr.map(function (e) { return _this.addElement(e); });
        }
    }
    ElementCollection.prototype.addElement = function (element) {
        if (element instanceof Network_Elements_1.Transceiver) {
            this.transceivers.push(element);
        }
        else if (element instanceof Network_Elements_1.Roadm) {
            this.roadms.push(element);
        }
        else if (element instanceof Network_Elements_1.Fiber) {
            this.fibers.push(element);
        }
        else if (element instanceof Network_Elements_1.Edfa) {
            this.amplifiers.push(element);
        }
        else {
            throw new Error("Incorrect Element. Supported Elements are Transceiver, Roadm, Fibre, Edfa");
        }
        this.elements.push(element);
    };
    ElementCollection.prototype.removeElement = function (element) {
        if (element instanceof Network_Elements_1.Transceiver) {
            this.transceivers = this.transceivers.filter(function (value) { return !lodash_1.isEqual(element, value); });
        }
        else if (element instanceof Network_Elements_1.Roadm) {
            this.roadms = this.roadms.filter(function (value) { return !lodash_1.isEqual(element, value); });
        }
        else if (element instanceof Network_Elements_1.Fiber) {
            this.fibers = this.fibers.filter(function (value) { return !lodash_1.isEqual(element, value); });
        }
        else if (element instanceof Network_Elements_1.Edfa) {
            this.amplifiers = this.amplifiers.filter(function (value) { return !lodash_1.isEqual(element, value); });
        }
        else {
            throw new Error("Incorrect Element. Supported Elements are Transceiver, Roadm, Fibre, Edfa");
        }
        this.elements = this.elements.filter(function (value) { return !lodash_1.isEqual(element, value); });
    };
    Object.defineProperty(ElementCollection.prototype, "json", {
        get: function () {
            return this.elements;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElementCollection.prototype, "transceiverList", {
        get: function () {
            return this.transceivers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElementCollection.prototype, "amplifierList", {
        get: function () {
            return this.amplifiers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElementCollection.prototype, "fiberList", {
        get: function () {
            return this.fibers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElementCollection.prototype, "roadmList", {
        get: function () {
            return this.roadms;
        },
        enumerable: false,
        configurable: true
    });
    return ElementCollection;
}());
exports.ElementCollection = ElementCollection;
var ConnectionList = /** @class */ (function () {
    function ConnectionList(arr) {
        this.list = [];
        if (arr) {
            this.list = arr;
        }
    }
    Object.defineProperty(ConnectionList.prototype, "json", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    ConnectionList.prototype.addConnection = function (transceiver, roadm) {
        /* connect transceiver with roadm */
        this.list = __spreadArray([
            {
                from_node: transceiver.uid,
                to_node: roadm.uid,
            },
            {
                from_node: roadm.uid,
                to_node: transceiver.uid,
            }
        ], this.list);
    };
    ConnectionList.prototype.removeConnection = function (transceiver, roadm) {
        var _this = this;
        [
            {
                from_node: transceiver.uid,
                to_node: roadm.uid,
            },
            {
                from_node: roadm.uid,
                to_node: transceiver.uid,
            },
        ].forEach(function (conn) {
            _this.list = _this.list.filter(function (value) {
                return !lodash_1.isEqual(conn, value);
            });
        });
    };
    ConnectionList.prototype.addPath = function (roadm_A, fiber_AB, roadm_B, fiber_BA) {
        /* add a bi-directional fiber path from roadm_A to roadm_B*/
        this.list = __spreadArray([
            {
                from_node: roadm_A.uid,
                to_node: fiber_AB.uid,
            },
            {
                from_node: fiber_AB.uid,
                to_node: roadm_B.uid,
            },
            {
                from_node: roadm_B.uid,
                to_node: fiber_BA.uid,
            },
            {
                from_node: fiber_BA.uid,
                to_node: roadm_A.uid,
            }
        ], this.list);
    };
    return ConnectionList;
}());
exports.ConnectionList = ConnectionList;

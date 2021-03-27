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
        this.ids = new Set();
        this.transceivers = [];
        this.roadms = [];
        this.amplifiers = [];
        this.fibers = [];
        if (arr) {
            arr.forEach(function (e, i) {
                switch (e.type) {
                    case "Transceiver":
                        return _this.add(new Network_Elements_1.Transceiver(e));
                    case "Roadm":
                        return _this.add(new Network_Elements_1.Roadm(e));
                    case "Fiber":
                        return _this.add(new Network_Elements_1.Fiber(e));
                    case "Edfa":
                        return _this.add(new Network_Elements_1.Edfa(e));
                }
            });
        }
    }
    ElementCollection.prototype.get = function (uid) {
        /* Finds element , if found returns the class object else returns undefined*/
        return lodash_1.find(this.elements, function (o) { return uid === o.uid; });
    };
    ElementCollection.prototype.add = function (element) {
        if (this.ids.has(element.uid)) {
            throw new Error("Element of uid \"" + element.uid + "\" already exists. Use a different identifier.");
        }
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
        this.ids.add(element.uid);
        this.elements.push(element);
    };
    ElementCollection.prototype.remove = function (uid, type) {
        /* Finds element , if found returns the class object else returns undefined*/
        if (!this.ids.has(uid)) {
            throw new Error("Element doesn't exist");
        }
        switch (type) {
            case "Transceiver":
                this.transceivers = lodash_1.filter(this.transceivers, function (o) { return uid !== o.uid; });
                break;
            case "Roadm":
                this.roadms = lodash_1.filter(this.roadms, function (o) { return uid !== o.uid; });
                break;
            case "Fiber":
                this.fibers = lodash_1.filter(this.fibers, function (o) { return uid !== o.uid; });
                break;
            case "Edfa":
                this.amplifiers = lodash_1.filter(this.amplifiers, function (o) { return uid !== o.uid; });
                break;
        }
        this.elements = lodash_1.filter(this.elements, function (o) { return uid !== o.uid; });
        this.ids.delete(uid);
    };
    Object.defineProperty(ElementCollection.prototype, "uids", {
        get: function () {
            return this.ids;
        },
        enumerable: false,
        configurable: true
    });
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
    ConnectionList.prototype.addLink = function (roadm_A, fiber_AB, roadm_B, fiber_BA) {
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
    ConnectionList.prototype.removeLink = function (roadmA_uid, fiberAB_uid, roadmB_uid, fiberBA_uid) {
        var _this = this;
        /* remove a bi-directional fiber path from roadm_A to roadm_B*/
        [
            {
                from_node: roadmA_uid,
                to_node: fiberAB_uid,
            },
            {
                from_node: fiberAB_uid,
                to_node: roadmB_uid,
            },
            {
                from_node: roadmB_uid,
                to_node: fiberBA_uid,
            },
            {
                from_node: fiberBA_uid,
                to_node: roadmA_uid,
            },
        ].forEach(function (conn) {
            _this.list = _this.list.filter(function (value) {
                return !lodash_1.isEqual(conn, value);
            });
        });
    };
    return ConnectionList;
}());
exports.ConnectionList = ConnectionList;

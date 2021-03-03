"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementCollection = void 0;
var Network_Elements_1 = require("./Network_Elements");
var ElementCollection = /** @class */ (function () {
    function ElementCollection(arr) {
        var _this = this;
        this.elements = [];
        this.transceivers = [];
        this.roadms = [];
        this.amplifiers = [];
        this.fibers = [];
        if (arr) {
            arr.map(function (e) { return _this.push(e); });
        }
    }
    ElementCollection.prototype.push = function (element) {
        this.elements.push(element);
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
    };
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

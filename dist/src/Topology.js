"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalTopology = void 0;
var Collections_1 = require("./Collections");
var PhysicalTopology = /** @class */ (function () {
    function PhysicalTopology(elems, conns) {
        if (elems && conns) {
            this.elements = elems;
            this.connections = conns;
        }
        else {
            this.elements = new Collections_1.ElementCollection();
            this.connections = new Collections_1.ConnectionList();
        }
    }
    PhysicalTopology.prototype.json = function () {
        return {
            elements: this.elements.json,
            connections: this.connections.json,
        };
    };
    return PhysicalTopology;
}());
exports.PhysicalTopology = PhysicalTopology;

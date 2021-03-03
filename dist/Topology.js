"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalTopology = void 0;
var Collections_1 = require("./Collections");
var PhysicalTopology = /** @class */ (function () {
    function PhysicalTopology(elements, connections) {
        if (elements && connections) {
            this.elementList = elements;
            this.connectionList = connections;
        }
        else {
            this.elementList = new Collections_1.ElementCollection();
            this.connectionList = new Collections_1.ConnectionList();
        }
    }
    PhysicalTopology.prototype.addElement = function (node) {
        this.elementList.push(node);
    };
    PhysicalTopology.prototype.addConnection = function (transceiver, roadm) {
        /* connect transceiver with roadm */
        this.connectionList.addConnection(transceiver, roadm);
    };
    PhysicalTopology.prototype.addPath = function (roadm_A, fiber_AB, roadm_B, fiber_BA) {
        /* add a bi-directional fiber path from roadm_A to roadm_B*/
        this.connectionList.addPath(roadm_A, fiber_AB, roadm_B, fiber_BA);
    };
    PhysicalTopology.prototype.json = function () {
        return {
            elements: this.elementList,
            connections: this.connectionList,
        };
    };
    return PhysicalTopology;
}());
exports.PhysicalTopology = PhysicalTopology;

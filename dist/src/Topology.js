"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalTopology = void 0;
var Collections_1 = require("./Collections");
var PhysicalTopology = /** @class */ (function () {
    function PhysicalTopology(network_name, metadata, elements, connections) {
        this.network_name = network_name;
        if (metadata && elements && connections) {
            this.metadata = metadata;
            this.elements = elements;
            this.connections = connections;
        }
        else {
            this.metadata = new Set();
            this.elements = new Collections_1.ElementCollection();
            this.connections = new Collections_1.ConnectionList();
        }
    }
    PhysicalTopology.prototype.addMetadata = function (city) {
        if (this.metadata.has(city)) {
            throw Error("Duplicate City in Topology Metadata");
        }
        else {
            this.metadata.add(city);
        }
    };
    PhysicalTopology.prototype.getMetadata = function () {
        return this.metadata;
    };
    PhysicalTopology.prototype.json = function () {
        return {
            network_name: this.network_name,
            metadata: this.metadata,
            elements: this.elements.json,
            connections: this.connections.json,
        };
    };
    return PhysicalTopology;
}());
exports.PhysicalTopology = PhysicalTopology;

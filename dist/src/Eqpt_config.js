"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentConfiguration = exports.GlobalConfig = void 0;
var Configs_1 = require("./Configs");
var lodash_1 = require("lodash");
var GlobalConfig = /** @class */ (function () {
    function GlobalConfig(r, fs, si) {
        this.roadm = new Configs_1.ROADMConfig(r);
        this.fiberSpans = new Configs_1.SpanConfig(fs);
        this.spectralInformation = new Configs_1.SpectralInformationConfig(si);
    }
    GlobalConfig.prototype.values = function (of) {
        switch (of) {
            case "Roadm":
                return this.roadm;
            case "SI":
                return this.spectralInformation;
            case "Span":
                return this.fiberSpans;
        }
    };
    GlobalConfig.prototype.update = function (config) {
        if (config instanceof Configs_1.ROADMConfig) {
            this.roadm = config;
        }
        else if (config instanceof Configs_1.SpanConfig) {
            this.fiberSpans = config;
        }
        else if (config instanceof Configs_1.SpectralInformationConfig) {
            this.spectralInformation = config;
        }
        else {
            throw Error("Send a Class Config Object. You may be sending an object. Check again!");
        }
    };
    return GlobalConfig;
}());
exports.GlobalConfig = GlobalConfig;
var EquipmentConfiguration = /** @class */ (function () {
    function EquipmentConfiguration(obj) {
        var _this = this;
        this.type_ids = new Set();
        this.amplifiers = [];
        this.transceivers = [];
        this.fibers = [];
        lodash_1.forEach(obj.Edfa, function (e) { return _this.addEdfa(e); });
        lodash_1.forEach(obj.Fiber, function (e) { return _this.addFiber(e); });
        lodash_1.forEach(obj.Transceiver, function (e) { return _this.addTranceiver(e); });
        this.global = new GlobalConfig(obj.Roadm[0], obj.Span[0], obj.SI[0]);
        this.ramanFiber = obj.RamanFiber;
    }
    EquipmentConfiguration.prototype.json = function () {
        return {
            Edfa: lodash_1.map(this.amplifiers, function (e) { return e.json; }),
            Fiber: lodash_1.map(this.fibers, function (e) { return e.json; }),
            Transceiver: lodash_1.map(this.transceivers, function (e) { return e.json; }),
            Roadm: [this.global.values("Roadm")],
            Span: [this.global.values("Span")],
            SI: [this.global.values("SI")],
            RamanFiber: this.ramanFiber,
        };
    };
    EquipmentConfiguration.prototype.getAvailable = function (equipment) {
        switch (equipment) {
            case "Edfa":
                var amps = lodash_1.filter(this.amplifiers, function (e) {
                    if (e.allowed_for_design) {
                        return true;
                    }
                    return false;
                });
                return lodash_1.map(amps, function (e) { return e.type_variety; });
            case "Fiber":
                return lodash_1.map(this.fibers, function (e) { return e.type_variety; });
            case "Transceiver":
                return lodash_1.map(this.transceivers, function (e) { return e.type_variety; });
        }
    };
    Object.defineProperty(EquipmentConfiguration.prototype, "Edfa", {
        get: function () {
            return this.amplifiers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EquipmentConfiguration.prototype, "Fiber", {
        get: function () {
            return this.fibers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EquipmentConfiguration.prototype, "Transceiver", {
        get: function () {
            return this.transceivers;
        },
        enumerable: false,
        configurable: true
    });
    EquipmentConfiguration.prototype.addEdfa = function (obj) {
        if (this.type_ids.has(obj.type_variety)) {
            throw Error("Duplicate Type Variety Identifier for Amplifier.");
        }
        if (obj instanceof Configs_1.EdfaConfig) {
            this.amplifiers.push(obj);
        }
        else {
            this.amplifiers.push(new Configs_1.EdfaConfig(obj));
        }
        this.type_ids.add(obj.type_variety);
    };
    EquipmentConfiguration.prototype.removeEdfa = function (id) {
        if (this.type_ids.has(id)) {
            var edfa_1 = null;
            this.amplifiers = lodash_1.filter(this.amplifiers, function (e) {
                if (e.type_variety !== id) {
                    return true;
                }
                else {
                    edfa_1 = e;
                    return false;
                }
            });
            this.type_ids.delete(id);
            return edfa_1;
        }
        else {
            throw Error("No Amplifier with that Type Variety");
        }
    };
    EquipmentConfiguration.prototype.addTranceiver = function (obj) {
        if (this.type_ids.has(obj.type_variety)) {
            throw Error("Duplicate Type Variety Identifier for Transceiver.");
        }
        if (obj instanceof Configs_1.TranceiverConfig) {
            this.transceivers.push(obj);
        }
        else {
            this.transceivers.push(new Configs_1.TranceiverConfig(obj));
        }
        this.type_ids.add(obj.type_variety);
    };
    EquipmentConfiguration.prototype.removeTransceiver = function (id) {
        if (this.type_ids.has(id)) {
            var tran_1 = null;
            this.transceivers = lodash_1.filter(this.transceivers, function (e) {
                if (e.type_variety !== id) {
                    return true;
                }
                else {
                    tran_1 = e;
                    return false;
                }
            });
            this.type_ids.delete(id);
            return tran_1;
        }
        else {
            throw Error("No Transceiver with that Type Variety");
        }
    };
    EquipmentConfiguration.prototype.addFiber = function (obj) {
        if (this.type_ids.has(obj.type_variety)) {
            throw Error("Duplicate Type Variety Identifier for Fiber.");
        }
        if (obj instanceof Configs_1.FiberConfig) {
            this.fibers.push(obj);
        }
        else {
            this.fibers.push(new Configs_1.FiberConfig(obj));
        }
        this.type_ids.add(obj.type_variety);
    };
    EquipmentConfiguration.prototype.removeFiber = function (id) {
        if (this.type_ids.has(id)) {
            var fib_1 = null;
            this.fibers = lodash_1.filter(this.fibers, function (e) {
                if (e.type_variety !== id) {
                    return true;
                }
                else {
                    fib_1 = e;
                    return false;
                }
            });
            this.type_ids.delete(id);
            return fib_1;
        }
        else {
            throw Error("No Fiber with that Type Variety");
        }
    };
    return EquipmentConfiguration;
}());
exports.EquipmentConfiguration = EquipmentConfiguration;

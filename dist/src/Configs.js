"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpectralInformationConfig = exports.SpanConfig = exports.ROADMConfig = exports.EdfaConfig = exports.FiberConfig = exports.TranceiverConfig = exports.ModeConfig = void 0;
var lodash_1 = require("lodash");
var ModeConfig = /** @class */ (function () {
    function ModeConfig(obj) {
        // this.format = obj.format;
        // this.baud_rate = obj.baud_rate;
        // this.OSNR = obj.OSNR;
        // this.bit_rate = obj.bit_rate;
        // this.roll_off = obj.roll_off;
        // this.tx_osnr = obj.tx_osnr;
        // this.min_spacing = obj.min_spacing;
        // this.cost = obj.cost;
        Object.assign(this, obj);
    }
    Object.defineProperty(ModeConfig.prototype, "json", {
        get: function () {
            return JSON.parse(JSON.stringify(this));
        },
        enumerable: false,
        configurable: true
    });
    return ModeConfig;
}());
exports.ModeConfig = ModeConfig;
var TranceiverConfig = /** @class */ (function () {
    function TranceiverConfig(obj) {
        this.frequency = obj.frequency;
        this.type_variety = obj.type_variety;
        this.mode = (0, lodash_1.map)(obj.mode, function (e) { return new ModeConfig(e); });
    }
    Object.defineProperty(TranceiverConfig.prototype, "json", {
        get: function () {
            return {
                type_variety: this.type_variety,
                frequency: this.frequency,
                mode: (0, lodash_1.map)(this.mode, function (e) { return e.json; }),
            };
        },
        enumerable: false,
        configurable: true
    });
    return TranceiverConfig;
}());
exports.TranceiverConfig = TranceiverConfig;
var FiberConfig = /** @class */ (function () {
    function FiberConfig(obj) {
        // this.type_variety = obj.type_variety;
        // this.dispersion = obj.dispersion;
        // this.gamma = obj.gamma;
        // this.pmd_coef = obj.pmd_coef;
        // if (obj.dispersion_slope) {
        // 	this.dispersion_slope = obj.dispersion_slope;
        // }
        Object.assign(this, obj);
    }
    Object.defineProperty(FiberConfig.prototype, "json", {
        get: function () {
            return JSON.parse(JSON.stringify(this));
        },
        enumerable: false,
        configurable: true
    });
    return FiberConfig;
}());
exports.FiberConfig = FiberConfig;
var EdfaConfig = /** @class */ (function () {
    function EdfaConfig(obj) {
        Object.assign(this, obj);
    }
    Object.defineProperty(EdfaConfig.prototype, "json", {
        get: function () {
            return JSON.parse(JSON.stringify(this));
        },
        enumerable: false,
        configurable: true
    });
    return EdfaConfig;
}());
exports.EdfaConfig = EdfaConfig;
var ROADMConfig = /** @class */ (function () {
    function ROADMConfig(obj) {
        // this.target_pch_out_db = obj.target_pch_out_db;
        // this.add_drop_osnr = obj.add_drop_osnr;
        // this.pmd = obj.pmd;
        // this.restrictions = obj.restrictions;
        Object.assign(this, obj);
    }
    Object.defineProperty(ROADMConfig.prototype, "json", {
        get: function () {
            return JSON.parse(JSON.stringify(this));
        },
        enumerable: false,
        configurable: true
    });
    return ROADMConfig;
}());
exports.ROADMConfig = ROADMConfig;
var SpanConfig = /** @class */ (function () {
    function SpanConfig(obj) {
        Object.assign(this, obj);
    }
    Object.defineProperty(SpanConfig.prototype, "json", {
        get: function () {
            return JSON.parse(JSON.stringify(this));
        },
        enumerable: false,
        configurable: true
    });
    return SpanConfig;
}());
exports.SpanConfig = SpanConfig;
var SpectralInformationConfig = /** @class */ (function () {
    function SpectralInformationConfig(obj) {
        Object.assign(this, obj);
    }
    Object.defineProperty(SpectralInformationConfig.prototype, "json", {
        get: function () {
            return JSON.parse(JSON.stringify(this));
        },
        enumerable: false,
        configurable: true
    });
    return SpectralInformationConfig;
}());
exports.SpectralInformationConfig = SpectralInformationConfig;

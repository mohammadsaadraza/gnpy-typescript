"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpectralInformationConfig = exports.SpanConfig = exports.ROADMConfig = exports.EdfaConfig = exports.FiberConfig = exports.TranceiverConfig = exports.ModeConfig = void 0;
var lodash_1 = require("lodash");
var ModeConfig = /** @class */ (function () {
    function ModeConfig(obj) {
        this.format = obj.format;
        this.baud_rate = obj.baud_rate;
        this.OSNR = obj.OSNR;
        this.bit_rate = obj.bit_rate;
        this.roll_off = obj.roll_off;
        this.tx_osnr = obj.tx_osnr;
        this.min_spacing = obj.min_spacing;
        this.cost = obj.cost;
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
        this.mode = lodash_1.map(obj.mode, function (e) { return new ModeConfig(e); });
    }
    Object.defineProperty(TranceiverConfig.prototype, "json", {
        get: function () {
            return {
                type_variety: this.type_variety,
                frequency: this.frequency,
                mode: lodash_1.map(this.mode, function (e) { return e.json; }),
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
        this.type_variety = obj.type_variety;
        this.dispersion = obj.dispersion;
        this.gamma = obj.gamma;
        this.pmd_coef = obj.pmd_coef;
        if (obj.dispersion_slope) {
            this.dispersion_slope = obj.dispersion_slope;
        }
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
        this.type_variety = obj.type_variety;
        this.type_def = obj.type_def;
        this.out_voa_auto = obj.out_voa_auto;
        this.allowed_for_design = obj.allowed_for_design;
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
        this.target_pch_out_db = obj.target_pch_out_db;
        this.add_drop_osnr = obj.add_drop_osnr;
        this.pmd = obj.pmd;
        this.restrictions = obj.restrictions;
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
        this.power_mode = obj.power_mode;
        this.delta_power_range_db = obj.delta_power_range_db;
        this.max_fiber_lineic_loss_for_raman =
            obj.max_fiber_lineic_loss_for_raman;
        this.target_extended_gain = obj.target_extended_gain;
        this.max_length = obj.max_length;
        this.length_units = obj.length_units;
        this.max_loss = obj.max_loss;
        this.padding = obj.padding;
        this.EOL = obj.EOL;
        this.con_in = obj.con_in;
        this.con_out = obj.con_out;
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
        this.f_min = obj.f_min;
        this.f_max = obj.f_max;
        this.baud_rate = obj.baud_rate;
        this.spacing = obj.spacing;
        this.power_dbm = obj.power_dbm;
        this.power_range_db = obj.power_range_db;
        this.roll_off = obj.roll_off;
        this.tx_osnr = obj.tx_osnr;
        this.sys_margins = obj.sys_margins;
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

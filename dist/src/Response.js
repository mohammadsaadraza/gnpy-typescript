"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightPath_Collection = exports.LightPath = exports.PathProperties = void 0;
var lodash_1 = require("lodash");
var PathProperties = /** @class */ (function () {
    function PathProperties(obj) {
        var _this = this;
        this.a_z = [];
        (0, lodash_1.forEach)(obj["path-route-objects"], function (e) {
            if (e["path-route-object"]["num-unnum-hop"]) {
                _this.a_z.push(e["path-route-object"]["num-unnum-hop"]["node-id"]);
            }
        });
        if (obj.reverse_path_route_objects) {
            this.z_a = [];
            (0, lodash_1.forEach)(obj.reverse_path_route_objects, function (e) {
                if (e["path-route-object"]["num-unnum-hop"] && _this.z_a) {
                    _this.z_a.push(e["path-route-object"]["num-unnum-hop"]["node-id"]);
                }
            });
        }
        this.a_z_metrics = this.getMetrics(obj["path-metric"]);
        if (obj["z-a-path-metric"]) {
            this.z_a_metrics = this.getMetrics(obj["z-a-path-metric"]);
        }
    }
    PathProperties.prototype.getMetrics = function (obj) {
        var values = {
            "SNR-bandwidth": 0,
            "SNR-0.1nm": 0,
            "OSNR-bandwidth": 0,
            "OSNR-0.1nm": 0,
            Transponder: { name: "", mode: "" },
            reference_power: 0,
            path_bandwidth: 0,
            "num-of-channels": 0,
            "path-channel-spacing": 0,
            "bit-rate": 0,
            "freq-spectrum": { "freq-start": 0, "freq-end": 0 },
        };
        (0, lodash_1.forEach)(obj, function (e) {
            switch (e["metric-type"]) {
                case "SNR-bandwidth":
                    if (e["accumulative-value"]) {
                        values["SNR-bandwidth"] = e["accumulative-value"];
                    }
                    break;
                case "SNR-0.1nm":
                    if (e["accumulative-value"]) {
                        values["SNR-0.1nm"] = e["accumulative-value"];
                    }
                    break;
                case "OSNR-bandwidth":
                    if (e["accumulative-value"]) {
                        values["OSNR-bandwidth"] = e["accumulative-value"];
                    }
                    break;
                case "OSNR-0.1nm":
                    if (e["accumulative-value"]) {
                        values["OSNR-0.1nm"] = e["accumulative-value"];
                    }
                    break;
                case "Transponder":
                    if (e.name && e.mode) {
                        values.Transponder = { name: e.name, mode: e.mode };
                    }
                    break;
                case "reference_power":
                    if (e["accumulative-value"]) {
                        values.reference_power = e["accumulative-value"];
                    }
                    break;
                case "path_bandwidth":
                    if (e["accumulative-value"]) {
                        values.path_bandwidth = e["accumulative-value"];
                    }
                    break;
                case "num-of-channels":
                    if (e["accumulative-value"]) {
                        values["num-of-channels"] = e["accumulative-value"];
                    }
                    break;
                case "path-channel-spacing":
                    if (e["accumulative-value"]) {
                        values["path-channel-spacing"] =
                            e["accumulative-value"];
                    }
                    break;
                case "bit-rate":
                    if (e["accumulative-value"]) {
                        values["bit-rate"] = e["accumulative-value"];
                    }
                    break;
                case "freq-spectrum":
                    if (e["freq-start"] && e["freq-end"]) {
                        values["freq-spectrum"] = {
                            "freq-start": e["freq-start"],
                            "freq-end": e["freq-end"],
                        };
                    }
                    break;
            }
        });
        return values;
    };
    return PathProperties;
}());
exports.PathProperties = PathProperties;
var LightPath = /** @class */ (function () {
    function LightPath(obj) {
        var _a, _b, _c;
        this.blocked = { reason: undefined, bool: false };
        this.response_id = obj["response-id"];
        if ("no-path" in obj) {
            this.blocked.bool = true;
            this.blocked.reason = (_a = obj["no-path"]) === null || _a === void 0 ? void 0 : _a["no-path"];
            if ((_b = obj["no-path"]) === null || _b === void 0 ? void 0 : _b["path-properties"]) {
                this.path_properties = new PathProperties((_c = obj["no-path"]) === null || _c === void 0 ? void 0 : _c["path-properties"]);
            }
        }
        else {
            if (obj["path-properties"]) {
                this.path_properties = new PathProperties(obj["path-properties"]);
            }
        }
    }
    return LightPath;
}());
exports.LightPath = LightPath;
var LightPath_Collection = /** @class */ (function () {
    function LightPath_Collection(obj) {
        var _this = this;
        this.lightpaths = [];
        this.IDs = new Set();
        this.responseJSON = JSON.stringify(obj);
        this.lightpaths = (0, lodash_1.map)(obj.response, function (e) {
            _this.IDs.add(e["response-id"]);
            return new LightPath(e);
        });
    }
    LightPath_Collection.prototype.getJSON = function () {
        return JSON.parse(this.responseJSON);
    };
    Object.defineProperty(LightPath_Collection.prototype, "responseIDs", {
        get: function () {
            return this.IDs;
        },
        enumerable: false,
        configurable: true
    });
    LightPath_Collection.prototype.get = function (id) {
        if (!this.IDs.has(id)) {
            throw Error("Incorrect ID of response. Check again!");
        }
        return (0, lodash_1.find)(this.lightpaths, function (e) { return e.response_id === id; });
    };
    return LightPath_Collection;
}());
exports.LightPath_Collection = LightPath_Collection;

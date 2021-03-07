"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathRequest_Collection = exports.PathRequest = exports.PathConstraints = void 0;
var lodash_1 = require("lodash");
var PathConstraints = /** @class */ (function () {
    function PathConstraints(obj) {
        this.technology = obj.technology;
        this.trx_type = obj.trx_type;
        this.trx_mode = obj.trx_mode;
        this.spacing = obj.spacing;
        this.max_channels = obj.max_channels;
        this.output_power = obj.output_power;
        this.path_bandwidth = obj.path_bandwidth;
    }
    Object.defineProperty(PathConstraints.prototype, "json", {
        get: function () {
            return {
                "te-bandwidth": {
                    technology: this.technology,
                    trx_type: this.trx_type,
                    trx_mode: this.trx_mode,
                    spacing: this.spacing,
                    "max-nb-of-channel": this.max_channels,
                    "output-power": this.output_power,
                    path_bandwidth: this.path_bandwidth,
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return PathConstraints;
}());
exports.PathConstraints = PathConstraints;
var PathRequest = /** @class */ (function () {
    function PathRequest(obj) {
        this.request_id = obj.request_id;
        this.source = obj.source;
        this.destination = obj.destination;
        this.bidirectional = obj.bidirectional;
        if (obj.path_constraints instanceof PathConstraints) {
            this.path_constraints = obj.path_constraints;
        }
        else {
            this.path_constraints = new PathConstraints(obj.path_constraints);
        }
    }
    Object.defineProperty(PathRequest.prototype, "json", {
        get: function () {
            return {
                "request-id": this.request_id,
                source: this.source,
                destination: this.destination,
                bidirectional: this.bidirectional,
                "path-constraints": this.path_constraints.json,
            };
        },
        enumerable: false,
        configurable: true
    });
    return PathRequest;
}());
exports.PathRequest = PathRequest;
var PathRequest_Collection = /** @class */ (function () {
    function PathRequest_Collection(list) {
        var _this = this;
        this.requests = [];
        if (list) {
            lodash_1.forEach(list, function (e) {
                if (e instanceof PathRequest) {
                    _this.requests.push(e);
                }
                else {
                    _this.requests.push(new PathRequest(e));
                }
            });
        }
    }
    PathRequest_Collection.prototype.add = function (obj) {
        this.requests.push(new PathRequest(obj));
    };
    PathRequest_Collection.prototype.remove = function (id) {
        this.requests = lodash_1.filter(this.requests, function (e) { return e.request_id !== id; });
    };
    PathRequest_Collection.prototype.get = function (id) {
        return lodash_1.find(this.requests, function (e) { return id === e.request_id; });
    };
    Object.defineProperty(PathRequest_Collection.prototype, "json", {
        get: function () {
            return lodash_1.map(this.requests, function (e) { return e.json; });
        },
        enumerable: false,
        configurable: true
    });
    return PathRequest_Collection;
}());
exports.PathRequest_Collection = PathRequest_Collection;

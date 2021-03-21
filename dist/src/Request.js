"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathRequest_Collection = exports.SyncVector_Collection = exports.SynchronizationVector = exports.PathRequest = exports.PathConstraints = void 0;
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
    PathRequest.prototype.copy = function (new_id) {
        var obj = new PathRequest(this);
        obj.request_id = new_id;
        return obj;
    };
    return PathRequest;
}());
exports.PathRequest = PathRequest;
var SynchronizationVector = /** @class */ (function () {
    function SynchronizationVector(obj) {
        this.sync_id = obj.sync_id;
        this.svec = obj.svec;
    }
    Object.defineProperty(SynchronizationVector.prototype, "json", {
        get: function () {
            return {
                "synchronization-id": this.sync_id,
                svec: {
                    relaxable: this.svec.relaxable,
                    disjointness: this.svec.disjointness,
                    "request-id-number": this.svec.request_id_number,
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SynchronizationVector;
}());
exports.SynchronizationVector = SynchronizationVector;
var SyncVector_Collection = /** @class */ (function () {
    function SyncVector_Collection(sVecs) {
        var _this = this;
        this.syncVectors = [];
        if (sVecs) {
            lodash_1.forEach(sVecs, function (e) {
                _this.add(e);
            });
        }
    }
    SyncVector_Collection.prototype.add = function (obj) {
        if (obj instanceof SynchronizationVector) {
            this.syncVectors.push(obj);
        }
        else {
            this.syncVectors.push(new SynchronizationVector(obj));
        }
    };
    SyncVector_Collection.prototype.remove = function (id) {
        this.syncVectors = lodash_1.filter(this.syncVectors, function (e) { return e.sync_id !== id; });
    };
    SyncVector_Collection.prototype.get = function (id) {
        return lodash_1.find(this.syncVectors, function (e) { return id === e.sync_id; });
    };
    Object.defineProperty(SyncVector_Collection.prototype, "json", {
        get: function () {
            return lodash_1.map(this.syncVectors, function (e) { return e.json; });
        },
        enumerable: false,
        configurable: true
    });
    return SyncVector_Collection;
}());
exports.SyncVector_Collection = SyncVector_Collection;
var PathRequest_Collection = /** @class */ (function () {
    function PathRequest_Collection(list) {
        var _this = this;
        this.requests = [];
        if (list) {
            lodash_1.forEach(list, function (e) {
                _this.add(e);
            });
        }
    }
    PathRequest_Collection.prototype.add = function (obj) {
        if (obj instanceof PathRequest) {
            this.requests.push(obj);
        }
        else {
            this.requests.push(new PathRequest(obj));
        }
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

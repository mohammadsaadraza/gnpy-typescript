"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequests = void 0;
var Request_1 = require("./Request");
var ServiceRequests = /** @class */ (function () {
    function ServiceRequests(reqs, sVecs) {
        this.pathRequests = reqs ? reqs : new Request_1.PathRequest_Collection();
        this.syncVectors = sVecs ? sVecs : new Request_1.SyncVector_Collection();
    }
    ServiceRequests.prototype.json = function () {
        return {
            "path-request": this.pathRequests.json,
            synchronization: this.syncVectors.json,
        };
    };
    return ServiceRequests;
}());
exports.ServiceRequests = ServiceRequests;

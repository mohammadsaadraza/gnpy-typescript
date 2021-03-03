"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edfa = exports.Fiber = exports.Roadm = exports.Transceiver = exports.GNPY_Node = void 0;
var GNPY_Node = /** @class */ (function () {
    function GNPY_Node(node) {
        this.uid = node.uid;
        this.type = node.type;
        this.metadata = node.metadata;
    }
    Object.defineProperty(GNPY_Node.prototype, "location", {
        get: function () {
            return [
                this.metadata.location.latitude,
                this.metadata.location.longitude,
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GNPY_Node.prototype, "info", {
        get: function () {
            return this.metadata.location.city + ", " + this.metadata.location.region;
        },
        enumerable: false,
        configurable: true
    });
    return GNPY_Node;
}());
exports.GNPY_Node = GNPY_Node;
var Transceiver = /** @class */ (function (_super) {
    __extends(Transceiver, _super);
    function Transceiver(node) {
        var _this = this;
        var uid = node.uid, type = node.type, metadata = node.metadata;
        _this = _super.call(this, { uid: uid, type: type, metadata: metadata }) || this;
        if (node.type_variety) {
            _this.type_variety = node.type_variety;
        }
        return _this;
    }
    return Transceiver;
}(GNPY_Node));
exports.Transceiver = Transceiver;
var Roadm = /** @class */ (function (_super) {
    __extends(Roadm, _super);
    function Roadm(node) {
        var _this = this;
        var uid = node.uid, type = node.type, metadata = node.metadata;
        _this = _super.call(this, { uid: uid, type: type, metadata: metadata }) || this;
        _this.params = node.params;
        return _this;
    }
    return Roadm;
}(GNPY_Node));
exports.Roadm = Roadm;
var Fiber = /** @class */ (function (_super) {
    __extends(Fiber, _super);
    function Fiber(node) {
        var _this = this;
        var uid = node.uid, type = node.type, metadata = node.metadata;
        _this = _super.call(this, { uid: uid, type: type, metadata: metadata }) || this;
        _this.params = node.params;
        _this.type_variety = node.type_variety;
        return _this;
    }
    return Fiber;
}(GNPY_Node));
exports.Fiber = Fiber;
var Edfa = /** @class */ (function (_super) {
    __extends(Edfa, _super);
    function Edfa(node) {
        var _this = this;
        var uid = node.uid, type = node.type, metadata = node.metadata;
        _this = _super.call(this, { uid: uid, type: type, metadata: metadata }) || this;
        _this.operational = node.operational;
        _this.type_variety = node.type_variety;
        return _this;
    }
    return Edfa;
}(GNPY_Node));
exports.Edfa = Edfa;

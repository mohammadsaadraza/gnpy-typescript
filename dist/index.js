"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Network_Elements_1 = require("./Network_Elements");
var t = new Network_Elements_1.Transceiver({
    uid: "vdfsvv",
    type: "Roadm",
    metadata: {
        location: {
            latitude: 0,
            longitude: 5,
            city: "Islamabad",
            region: "Pakistan",
        },
    },
});
console.log(t.info);

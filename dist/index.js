"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Topology_1 = require("./src/Topology");
var Collections_1 = require("./src/Collections");
var fs_1 = __importDefault(require("fs"));
var input = JSON.parse(fs_1.default.readFileSync("./test_files/input.json").toString());
var Topology = new Topology_1.PhysicalTopology(new Collections_1.ElementCollection(input.elements), new Collections_1.ConnectionList(input.connections));
var A = Topology.elements.get("Site_A");
if (A) {
    Topology.elements.remove(A.uid, A.type);
}
console.log(Topology.connections.json);
// console.log(input);
// const top = new PhysicalTopology();
// const tran = new Transceiver({
// 	uid: "djvnjcvnc",
// 	type: "Transceiver",
// 	metadata: {
// 		location: {
// 			latitude: 0,
// 			longitude: 5,
// 			city: "",
// 			region: "",
// 		},
// 	},
// });
// const roadm = new Roadm({
// 	uid: "djvnjfddvdvdvcvnc",
// 	type: "Roadm",
// 	metadata: {
// 		location: {
// 			latitude: 0,
// 			longitude: 5,
// 			city: "",
// 			region: "",
// 		},
// 	},
// });
// try {
// 	top.elements.add(tran);
// 	top.elements.add(roadm);
// } catch (e) {
// 	console.log(e);
// }
// console.log(top.elements.get([roadm.uid]));
// top.elements.remove(roadm.uid, roadm.type);
// console.log(top.elements.json, top.elements.uids);
// top.connections.addConnection(tran, roadm);
// top.connections.removeConnection(tran, roadm);
// const fileWrite = async () => {
// 	await fs.writeFileSync("./ex.json", JSON.stringify(top.json(), null, 2));
// 	console.log("written");
// };
// fileWrite();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Response_1 = require("./src/Response");
var input = JSON.parse(fs_1.default.readFileSync("./test_files/result.json").toString());
var lights = new Response_1.LigthPath_Collection(input);
console.log(lights.get("1"));
// const r1 = new PathRequest({
// 	request_id: "r1",
// 	source: "Site_B",
// 	destination: "Site_C",
// 	bidirectional: false,
// 	path_constraints: new PathConstraints({
// 		technology: "flexi-grid",
// 		trx_type: "Voyager",
// 		trx_mode: null,
// 		spacing: 40e9,
// 		max_channels: 100,
// 		output_power: null,
// 		path_bandwidth: 500e9,
// 	}),
// });
// const r2 = new PathRequest({
// 	request_id: "r2",
// 	source: "Site_A",
// 	destination: "Site_C",
// 	bidirectional: false,
// 	path_constraints: new PathConstraints({
// 		technology: "flexi-grid",
// 		trx_type: "Voyager",
// 		trx_mode: null,
// 		spacing: 40e9,
// 		max_channels: 100,
// 		output_power: null,
// 		path_bandwidth: 500e9,
// 	}),
// });
// const c = new PathRequest_Collection([r1, r2]);
// c.remove(r2.request_id);
// console.log(c.json);
// let input = JSON.parse(fs.readFileSync("./test_files/input.json").toString());
// const Topology = new PhysicalTopology(
// 	new ElementCollection(input.elements),
// 	new ConnectionList(input.connections)
// );
// const A = Topology.elements.get("Site_A");
// if (A) {
// 	Topology.elements.remove(A.uid, A.type);
// }
// console.log(Topology.connections.json);
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

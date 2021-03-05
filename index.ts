import { PhysicalTopology } from "./src/Topology";
import { ElementCollection, ConnectionList } from "./src/Collections";
import { Transceiver, Roadm, Fiber, Edfa } from "./src/Network_Elements";
import fs from "fs";
import { Network_Node } from "./src/Network_Defs";

let input = JSON.parse(fs.readFileSync("./test_files/input.json").toString());
const Topology = new PhysicalTopology(
	new ElementCollection(input.elements),
	new ConnectionList(input.connections)
);
const A = Topology.elements.get("Site_A");
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

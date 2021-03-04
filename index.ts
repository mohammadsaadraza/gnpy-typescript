import { PhysicalTopology } from "./Topology";
import { ElementCollection, ConnectionList } from "./Collections";
import { Transceiver, Roadm, Fiber, Edfa } from "./Network_Elements";
import fs from "fs";

const top = new PhysicalTopology();
const tran = new Transceiver({
	uid: "djvnjcvnc",
	type: "Transceiver",
	metadata: {
		location: {
			latitude: 0,
			longitude: 5,
			city: "",
			region: "",
		},
	},
});
const roadm = new Roadm({
	uid: "djvnjfddvdvdvcvnc",
	type: "Roadm",
	metadata: {
		location: {
			latitude: 0,
			longitude: 5,
			city: "",
			region: "",
		},
	},
});
top.elements.addElement(tran);
top.elements.addElement(roadm);

// top.elements.removeElement(roadm);

top.connections.addConnection(tran, roadm);
// top.connections.removeConnection(tran, roadm);

const fileWrite = async () => {
	await fs.writeFileSync("./ex.json", JSON.stringify(top.json(), null, 2));
	console.log("written");
};
fileWrite();

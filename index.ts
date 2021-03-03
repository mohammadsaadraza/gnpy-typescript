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
top.addElement(tran);
top.addElement(roadm);

top.addConnection(tran, roadm);

const fileWrite = async () => {
	await fs.writeFileSync("./ex.json", JSON.stringify(top.json(), null, 2));
	console.log("written");
};
fileWrite();

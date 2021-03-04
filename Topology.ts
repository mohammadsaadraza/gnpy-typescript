import { ElementCollection, ConnectionList } from "./Collections";
import { Network_Node } from "./Network_Defs";
import { Transceiver, Roadm, Fiber, Edfa } from "./Network_Elements";

export class PhysicalTopology {
	elements: ElementCollection;
	connections: ConnectionList;

	constructor(elems?: ElementCollection, conns?: ConnectionList) {
		if (elems && conns) {
			this.elements = elems;
			this.connections = conns;
		} else {
			this.elements = new ElementCollection();
			this.connections = new ConnectionList();
		}
	}

	json(): Object {
		return {
			elements: this.elements.json,
			connections: this.connections.json,
		};
	}
}

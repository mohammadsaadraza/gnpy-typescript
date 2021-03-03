import { ElementCollection, ConnectionList } from "./Collections";
import { Network_Node } from "./Network_Defs";
import { Transceiver, Roadm, Fiber, Edfa } from "./Network_Elements";

export class PhysicalTopology {
	private elementList: ElementCollection;
	private connectionList: ConnectionList;

	constructor(elements?: ElementCollection, connections?: ConnectionList) {
		if (elements && connections) {
			this.elementList = elements;
			this.connectionList = connections;
		} else {
			this.elementList = new ElementCollection();
			this.connectionList = new ConnectionList();
		}
	}

	addElement(node: Network_Node) {
		this.elementList.push(node);
	}

	addConnection(transceiver: Transceiver, roadm: Roadm) {
		/* connect transceiver with roadm */
		this.connectionList.addConnection(transceiver, roadm);
	}

	addPath(roadm_A: Roadm, fiber_AB: Fiber, roadm_B: Roadm, fiber_BA: Fiber) {
		/* add a bi-directional fiber path from roadm_A to roadm_B*/
		this.connectionList.addPath(roadm_A, fiber_AB, roadm_B, fiber_BA);
	}

	json(): Object {
		return {
			elements: this.elementList,
			connections: this.connectionList,
		};
	}
}

import {
	Network_Node,
	NetworkElement,
	Network_Transceiver,
	Network_Fiber,
	Network_Roadm,
	Network_Edfa,
} from "./Network_Defs";
import { Transceiver, Roadm, Fiber, Edfa, GNPY_Node } from "./Network_Elements";
import { isEqual, find, filter } from "lodash";

export interface Connection {
	from_node: string;
	to_node: string;
}

export class ElementCollection {
	private elements: Network_Node[] = [];

	private ids: Set<string> = new Set();

	private transceivers: Transceiver[] = [];
	private roadms: Roadm[] = [];
	private amplifiers: Edfa[] = [];
	private fibers: Fiber[] = [];

	constructor(arr?: Network_Node[]) {
		if (arr) {
			arr.forEach((e, i) => {
				switch (e.type) {
					case "Transceiver":
						return this.add(
							new Transceiver(e as Network_Transceiver)
						);
					case "Roadm":
						return this.add(new Roadm(e as Network_Roadm));
					case "Fiber":
						return this.add(new Fiber(e as Network_Fiber));
					case "Edfa":
						return this.add(new Edfa(e as Network_Edfa));
				}
			});
		}
	}

	get(uid: string): Network_Node | undefined {
		/* Finds element , if found returns the class object else returns undefined*/
		return find(this.elements, (o) => uid === o.uid);
	}

	add(element: Network_Node) {
		if (this.ids.has(element.uid)) {
			throw new Error(
				`Element of uid "${element.uid}" already exists. Use a different identifier.`
			);
		}

		if (element instanceof Transceiver) {
			this.transceivers.push(element);
		} else if (element instanceof Roadm) {
			this.roadms.push(element);
		} else if (element instanceof Fiber) {
			this.fibers.push(element);
		} else if (element instanceof Edfa) {
			this.amplifiers.push(element);
		} else {
			throw new Error(
				"Incorrect Element. Supported Elements are Transceiver, Roadm, Fibre, Edfa"
			);
		}
		this.ids.add(element.uid);
		this.elements.push(element);
	}

	remove(uid: string, type: NetworkElement) {
		/* Finds element , if found returns the class object else returns undefined*/
		if (!this.ids.has(uid)) {
			throw new Error(`Element doesn't exist`);
		}

		switch (type) {
			case "Transceiver":
				this.transceivers = filter(
					this.transceivers,
					(o) => uid !== o.uid
				);
				break;
			case "Roadm":
				this.roadms = filter(this.roadms, (o) => uid !== o.uid);
				break;
			case "Fiber":
				this.fibers = filter(this.fibers, (o) => uid !== o.uid);
				break;
			case "Edfa":
				this.amplifiers = filter(this.amplifiers, (o) => uid !== o.uid);
				break;
			default:
				this.elements = filter(this.elements, (o) => uid !== o.uid);
		}
		this.ids.delete(uid);
	}

	get uids() {
		return this.ids;
	}

	get json() {
		return this.elements;
	}

	get transceiverList(): Transceiver[] {
		return this.transceivers;
	}
	get amplifierList(): Edfa[] {
		return this.amplifiers;
	}
	get fiberList(): Fiber[] {
		return this.fibers;
	}
	get roadmList(): Roadm[] {
		return this.roadms;
	}
}

export class ConnectionList {
	private list: Connection[] = [];

	constructor(arr?: Connection[]) {
		if (arr) {
			this.list = arr;
		}
	}

	get json() {
		return this.list;
	}

	addConnection(transceiver: Transceiver, roadm: Roadm) {
		/* connect transceiver with roadm */
		this.list = [
			{
				from_node: transceiver.uid,
				to_node: roadm.uid,
			},
			{
				from_node: roadm.uid,
				to_node: transceiver.uid,
			},
			...this.list,
		];
	}

	removeConnection(transceiver: Transceiver, roadm: Roadm) {
		[
			{
				from_node: transceiver.uid,
				to_node: roadm.uid,
			},
			{
				from_node: roadm.uid,
				to_node: transceiver.uid,
			},
		].forEach((conn: Connection) => {
			this.list = this.list.filter((value) => {
				return !isEqual(conn, value);
			});
		});
	}

	addLink(roadm_A: Roadm, fiber_AB: Fiber, roadm_B: Roadm, fiber_BA: Fiber) {
		/* add a bi-directional fiber path from roadm_A to roadm_B*/
		this.list = [
			{
				from_node: roadm_A.uid,
				to_node: fiber_AB.uid,
			},
			{
				from_node: fiber_AB.uid,
				to_node: roadm_B.uid,
			},
			{
				from_node: roadm_B.uid,
				to_node: fiber_BA.uid,
			},
			{
				from_node: fiber_BA.uid,
				to_node: roadm_A.uid,
			},
			...this.list,
		];
	}

	removeLink(
		roadm_A: Roadm,
		fiber_AB: Fiber,
		roadm_B: Roadm,
		fiber_BA: Fiber
	) {
		/* add a bi-directional fiber path from roadm_A to roadm_B*/
		[
			{
				from_node: roadm_A.uid,
				to_node: fiber_AB.uid,
			},
			{
				from_node: fiber_AB.uid,
				to_node: roadm_B.uid,
			},
			{
				from_node: roadm_B.uid,
				to_node: fiber_BA.uid,
			},
			{
				from_node: fiber_BA.uid,
				to_node: roadm_A.uid,
			},
		].forEach((conn: Connection) => {
			this.list = this.list.filter((value) => {
				return !isEqual(conn, value);
			});
		});
	}
}

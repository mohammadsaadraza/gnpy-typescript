import { Network_Node } from "./Network_Defs";
import { Transceiver, Roadm, Fiber, Edfa } from "./Network_Elements";
import { isEqual } from "lodash";

export interface Connection {
	from_node: string;
	to_node: string;
}

export class ElementCollection {
	private elements: Network_Node[] = [];

	private transceivers: Transceiver[] = [];
	private roadms: Roadm[] = [];
	private amplifiers: Edfa[] = [];
	private fibers: Fiber[] = [];

	constructor(arr?: Network_Node[]) {
		if (arr) {
			arr.map((e) => this.addElement(e));
		}
	}

	addElement(element: Network_Node) {
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
		this.elements.push(element);
	}

	removeElement(element: Network_Node) {
		if (element instanceof Transceiver) {
			this.transceivers = this.transceivers.filter(
				(value) => !isEqual(element, value)
			);
		} else if (element instanceof Roadm) {
			this.roadms = this.roadms.filter(
				(value) => !isEqual(element, value)
			);
		} else if (element instanceof Fiber) {
			this.fibers = this.fibers.filter(
				(value) => !isEqual(element, value)
			);
		} else if (element instanceof Edfa) {
			this.amplifiers = this.amplifiers.filter(
				(value) => !isEqual(element, value)
			);
		} else {
			throw new Error(
				"Incorrect Element. Supported Elements are Transceiver, Roadm, Fibre, Edfa"
			);
		}
		this.elements = this.elements.filter(
			(value) => !isEqual(element, value)
		);
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

import {
	Network_Node,
	Network_Transceiver,
	Network_Roadm,
	Network_Fiber,
	Network_Edfa,
	NetworkElement,
	Km,
} from "./Network_Defs";

export class GNPY_Node implements Network_Node {
	public uid: string;
	public type: NetworkElement;
	public metadata: {
		location: {
			latitude: number;
			longitude: number;
			city: string;
			region: string;
		};
	};

	constructor(node: Network_Node) {
		this.uid = node.uid;
		this.type = node.type;
		this.metadata = node.metadata;
	}

	get location(): number[] {
		return [
			this.metadata.location.latitude,
			this.metadata.location.longitude,
		];
	}

	get info(): string {
		return `${this.metadata.location.city}, ${this.metadata.location.region}`;
	}
}

export class Transceiver extends GNPY_Node implements Network_Transceiver {
	public type_variety?: string;

	constructor(node: Network_Transceiver) {
		const { uid, type, metadata } = node;
		super({ uid, type, metadata });

		if (node.type_variety) {
			this.type_variety = node.type_variety;
		}
	}
}

export class Roadm extends GNPY_Node implements Network_Roadm {
	public params: {
		target_pch_out_db: number;
		restrictions: {};
		per_degree_pch_out_db: {};
	};

	constructor(node: Network_Roadm) {
		const { uid, type, metadata } = node;
		super({ uid, type, metadata });
		this.params = node.params;
	}
}

export class Fiber extends GNPY_Node implements Network_Fiber {
	public type_variety: string;
	public params: {
		length: number;
		loss_coef: number;
		length_units: Km;
		att_in: number;
		con_in: number;
		con_out: number;
	};

	constructor(node: Network_Fiber) {
		const { uid, type, metadata } = node;
		super({ uid, type, metadata });
		this.params = node.params;
		this.type_variety = node.type_variety;
	}
}

export class Edfa extends GNPY_Node implements Network_Edfa {
	public type_variety: string;
	public operational: {
		gain_target: number;
		delta_p: number;
		tilt_target: number;
		out_voa: number;
	};

	constructor(node: Network_Edfa) {
		const { uid, type, metadata } = node;
		super({ uid, type, metadata });
		this.operational = node.operational;
		this.type_variety = node.type_variety;
	}
}

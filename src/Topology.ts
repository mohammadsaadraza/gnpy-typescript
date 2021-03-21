import { ElementCollection, ConnectionList } from "./Collections";

export class PhysicalTopology {
	elements: ElementCollection;
	connections: ConnectionList;
	private network_name: string;
	metadata: Set<string>;

	constructor(
		network_name: string,
		metadata?: Set<string>,
		elements?: ElementCollection,
		connections?: ConnectionList
	) {
		this.network_name = network_name;
		if (metadata && elements && connections) {
			this.metadata = metadata;
			this.elements = elements;
			this.connections = connections;
		} else {
			this.metadata = new Set<string>();
			this.elements = new ElementCollection();
			this.connections = new ConnectionList();
		}
	}

	addMetadata(city: string) {
		if (this.metadata.has(city)) {
			throw Error("Duplicate City in Topology Metadata");
		} else {
			this.metadata.add(city);
		}
	}

	getMetadata() {
		return this.metadata;
	}

	json(): Object {
		return {
			network_name: this.network_name,
			metadata: this.metadata,
			elements: this.elements.json,
			connections: this.connections.json,
		};
	}
}

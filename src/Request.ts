import { forEach, filter, find, map } from "lodash";

interface ConstraintsObject {
	technology: string;
	trx_type: string;
	trx_mode: string | null;
	spacing: number;
	max_channels: number;
	output_power: number | null;
	path_bandwidth: number;
}

interface RequestObject {
	request_id: string;
	source: string;
	destination: string;
	bidirectional: boolean;
	path_constraints: ConstraintsObject;
}

export class PathConstraints implements ConstraintsObject {
	technology: string;
	trx_type: string;
	trx_mode: string | null;
	spacing: number;
	max_channels: number;
	output_power: number | null;
	path_bandwidth: number;

	constructor(obj: ConstraintsObject) {
		this.technology = obj.technology;
		this.trx_type = obj.trx_type;
		this.trx_mode = obj.trx_mode;
		this.spacing = obj.spacing;
		this.max_channels = obj.max_channels;
		this.output_power = obj.output_power;
		this.path_bandwidth = obj.path_bandwidth;
	}

	get json() {
		return {
			"te-bandwidth": {
				technology: this.technology,
				trx_type: this.trx_type,
				trx_mode: this.trx_mode,
				spacing: this.spacing,
				"max-nb-of-channel": this.max_channels,
				"output-power": this.output_power,
				path_bandwidth: this.path_bandwidth,
			},
		};
	}
}

export class PathRequest implements RequestObject {
	request_id: string;
	source: string;
	destination: string;
	bidirectional: boolean;
	path_constraints: PathConstraints;

	constructor(obj: RequestObject) {
		this.request_id = obj.request_id;
		this.source = obj.source;
		this.destination = obj.destination;
		this.bidirectional = obj.bidirectional;

		if (obj.path_constraints instanceof PathConstraints) {
			this.path_constraints = obj.path_constraints;
		} else {
			this.path_constraints = new PathConstraints(obj.path_constraints);
		}
	}

	get json() {
		return {
			"request-id": this.request_id,
			source: this.source,
			destination: this.destination,
			bidirectional: this.bidirectional,
			"path-constraints": this.path_constraints.json,
		};
	}
}

export class PathRequest_Collection {
	private requests: PathRequest[] = [];

	constructor(list?: RequestObject[]) {
		if (list) {
			forEach(list, (e) => {
				if (e instanceof PathRequest) {
					this.requests.push(e);
				} else {
					this.requests.push(new PathRequest(e));
				}
			});
		}
	}

	add(obj: RequestObject): void {
		this.requests.push(new PathRequest(obj));
	}

	remove(id: string): void {
		this.requests = filter(this.requests, (e) => e.request_id !== id);
	}

	get(id: string): PathRequest | undefined {
		return find(this.requests, (e) => id === e.request_id);
	}

	get json() {
		return map(this.requests, (e) => e.json);
	}
}

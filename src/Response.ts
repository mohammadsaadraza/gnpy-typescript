import { find, forEach, map } from "lodash";

export interface MetricObject {
	"metric-type": string;
	"accumulative-value"?: number;
	name?: string;
	mode?: string;
	"freq-start"?: number;
	"freq-end"?: number;
}

export interface MetricValues {
	"SNR-bandwidth": number;
	"SNR-0.1nm": number;
	"OSNR-bandwidth": number;
	"OSNR-0.1nm": number;
	Transponder: {
		name: string;
		mode: string;
	};
	reference_power: number;
	path_bandwidth: number;
	"num-of-channels": number;
	"path-channel-spacing": number;
	"bit-rate": number;
	"freq-spectrum": {
		"freq-start": number;
		"freq-end": number;
	};
}

export interface RouteObject {
	"path-route-object": {
		index: number;
		"num-unnum-hop"?: {
			"node-id": string;
			"link-tp-id": string;
		};
		"label-hop"?: {
			N: number;
			M: number;
		};
		transponder?: {
			"transponder-type": string;
			"transponder-mode": string;
		};
	};
}

export interface PropertiesObject {
	"path-metric": MetricObject[];
	"path-route-objects": RouteObject[];
	"z-a-path-metric"?: MetricObject[];
	reverse_path_route_objects?: RouteObject[];
}

export class PathProperties {
	a_z: string[] = [];
	z_a?: string[];
	a_z_metrics: MetricValues;
	z_a_metrics?: MetricValues;

	constructor(obj: PropertiesObject) {
		forEach(obj["path-route-objects"], (e) => {
			if (e["path-route-object"]["num-unnum-hop"]) {
				this.a_z.push(
					e["path-route-object"]["num-unnum-hop"]["node-id"]
				);
			}
		});

		if (obj.reverse_path_route_objects) {
			this.z_a = [];
			forEach(obj.reverse_path_route_objects, (e) => {
				if (e["path-route-object"]["num-unnum-hop"] && this.z_a) {
					this.z_a.push(
						e["path-route-object"]["num-unnum-hop"]["node-id"]
					);
				}
			});
		}
		this.a_z_metrics = this.getMetrics(obj["path-metric"]);

		if (obj["z-a-path-metric"]) {
			this.z_a_metrics = this.getMetrics(obj["z-a-path-metric"]);
		}
	}

	getMetrics(obj: MetricObject[]): MetricValues {
		var values: MetricValues = {
			"SNR-bandwidth": 0,
			"SNR-0.1nm": 0,
			"OSNR-bandwidth": 0,
			"OSNR-0.1nm": 0,
			Transponder: { name: "", mode: "" },
			reference_power: 0,
			path_bandwidth: 0,
			"num-of-channels": 0,
			"path-channel-spacing": 0,
			"bit-rate": 0,
			"freq-spectrum": { "freq-start": 0, "freq-end": 0 },
		};

		forEach(obj, (e: MetricObject) => {
			switch (e["metric-type"]) {
				case "SNR-bandwidth":
					if (e["accumulative-value"]) {
						values["SNR-bandwidth"] = e["accumulative-value"];
					}
					break;
				case "SNR-0.1nm":
					if (e["accumulative-value"]) {
						values["SNR-0.1nm"] = e["accumulative-value"];
					}
					break;
				case "OSNR-bandwidth":
					if (e["accumulative-value"]) {
						values["OSNR-bandwidth"] = e["accumulative-value"];
					}
					break;
				case "OSNR-0.1nm":
					if (e["accumulative-value"]) {
						values["OSNR-0.1nm"] = e["accumulative-value"];
					}
					break;
				case "Transponder":
					if (e.name && e.mode) {
						values.Transponder = { name: e.name, mode: e.mode };
					}
					break;
				case "reference_power":
					if (e["accumulative-value"]) {
						values.reference_power = e["accumulative-value"];
					}
					break;
				case "path_bandwidth":
					if (e["accumulative-value"]) {
						values.path_bandwidth = e["accumulative-value"];
					}
					break;
				case "num-of-channels":
					if (e["accumulative-value"]) {
						values["num-of-channels"] = e["accumulative-value"];
					}
					break;
				case "path-channel-spacing":
					if (e["accumulative-value"]) {
						values["path-channel-spacing"] =
							e["accumulative-value"];
					}
					break;
				case "bit-rate":
					if (e["accumulative-value"]) {
						values["bit-rate"] = e["accumulative-value"];
					}
					break;
				case "freq-spectrum":
					if (e["freq-start"] && e["freq-end"]) {
						values["freq-spectrum"] = {
							"freq-start": e["freq-start"],
							"freq-end": e["freq-end"],
						};
					}
					break;
			}
		});

		return values;
	}
}

export interface ResponseObject {
	"response-id": string;
	"no-path"?: {
		"no-path": string;
		"path-properties"?: PropertiesObject;
	};
	"path-properties"?: PropertiesObject;
}

export class LightPath {
	response_id: string;
	blocked: {
		reason: string | undefined;
		bool: boolean;
	} = { reason: undefined, bool: false };
	path_properties?: PathProperties;

	constructor(obj: ResponseObject) {
		this.response_id = obj["response-id"];

		if ("no-path" in obj) {
			this.blocked.bool = true;
			this.blocked.reason = obj["no-path"]?.["no-path"];
			if (obj["no-path"]?.["path-properties"]) {
				this.path_properties = new PathProperties(
					obj["no-path"]?.["path-properties"]
				);
			}
		} else {
			if (obj["path-properties"]) {
				this.path_properties = new PathProperties(
					obj["path-properties"]
				);
			}
		}
	}
}

export interface JSONInput {
	response: ResponseObject[];
}

export class LightPath_Collection {
	lightpaths: LightPath[] = [];
	private responseJSON: string;
	private IDs: Set<string> = new Set();

	constructor(obj: JSONInput) {
		this.responseJSON = JSON.stringify(obj);
		this.lightpaths = map(obj.response, (e: ResponseObject) => {
			this.IDs.add(e["response-id"]);
			return new LightPath(e);
		});
	}

	getJSON() {
		return JSON.parse(this.responseJSON);
	}

	get responseIDs() {
		return this.IDs;
	}

	get(id: string) {
		if (!this.IDs.has(id)) {
			throw Error("Incorrect ID of response. Check again!");
		}
		return find(this.lightpaths, (e) => e.response_id === id);
	}
}

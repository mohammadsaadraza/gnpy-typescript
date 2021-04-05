import {
	EdfaParams,
	TransceiverParams,
	T_ModeParams,
	FiberParams,
	ROADMParams,
	SpanParams,
	SI_Params,
} from "./Params";
import {
	EdfaConfig,
	TranceiverConfig,
	FiberConfig,
	ROADMConfig,
	SpanConfig,
	SpectralInformationConfig,
} from "./Configs";
import { Edfa } from "./Network_Elements";
import { forEach, filter, find, map } from "lodash";

export interface JSONInput_EqptConfig {
	Edfa: EdfaParams[];
	Fiber: FiberParams[];
	RamanFiber: any;
	Span: [SpanParams];
	Roadm: [ROADMParams];
	SI: [SI_Params];
	Transceiver: TransceiverParams[];
}

export class GlobalConfig {
	private roadm: ROADMConfig;
	private fiberSpans: SpanConfig;
	private spectralInformation: SpectralInformationConfig;

	constructor(r: ROADMParams, fs: SpanParams, si: SI_Params) {
		this.roadm = new ROADMConfig(r);
		this.fiberSpans = new SpanConfig(fs);
		this.spectralInformation = new SpectralInformationConfig(si);
	}

	values(of: "SI" | "Span" | "Roadm") {
		switch (of) {
			case "Roadm":
				return this.roadm;
			case "SI":
				return this.spectralInformation;
			case "Span":
				return this.fiberSpans;
		}
	}

	update(config: ROADMConfig | SpanConfig | SpectralInformationConfig) {
		if (config instanceof ROADMConfig) {
			this.roadm = config;
		} else if (config instanceof SpanConfig) {
			this.fiberSpans = config;
		} else if (config instanceof SpectralInformationConfig) {
			this.spectralInformation = config;
		} else {
			throw Error(
				"Send a Class Config Object. You may be sending an object. Check again!"
			);
		}
	}
}

export class EquipmentConfiguration {
	private type_ids: Set<string> = new Set();
	private amplifiers: EdfaConfig[] = [];
	private transceivers: TranceiverConfig[] = [];
	private fibers: FiberConfig[] = [];
	private ramanFiber: any;

	global: GlobalConfig;

	constructor(obj: JSONInput_EqptConfig) {
		forEach(obj.Edfa, (e) => this.addEdfa(e));
		forEach(obj.Fiber, (e) => this.addFiber(e));
		forEach(obj.Transceiver, (e) => this.addTranceiver(e));

		this.global = new GlobalConfig(obj.Roadm[0], obj.Span[0], obj.SI[0]);
		this.ramanFiber = obj.RamanFiber;
	}

	json() {
		return {
			Edfa: map(this.amplifiers, (e) => e.json),
			Fiber: map(this.fibers, (e) => e.json),
			Transceiver: map(this.transceivers, (e) => e.json),
			Roadm: [this.global.values("Roadm")],
			Span: [this.global.values("Span")],
			SI: [this.global.values("SI")],
			RamanFiber: this.ramanFiber,
		};
	}

	getAvailable(equipment: "Edfa" | "Fiber" | "Transceiver") {
		switch (equipment) {
			case "Edfa":
				const amps: EdfaConfig[] = filter(this.amplifiers, (e) => {
					if (e.allowed_for_design) {
						return true;
					}
					return false;
				});
				return map(amps, (e) => e.type_variety);

			case "Fiber":
				return map(this.fibers, (e) => e.type_variety);
			case "Transceiver":
				return map(this.transceivers, (e) => e.type_variety);
		}
	}

	get Edfa() {
		return this.amplifiers;
	}
	get Fiber() {
		return this.fibers;
	}
	get Transceiver() {
		return this.transceivers;
	}

	addEdfa(obj: EdfaParams) {
		if (this.type_ids.has(obj.type_variety)) {
			throw Error("Duplicate Type Variety Identifier for Amplifier.");
		}

		if (obj instanceof EdfaConfig) {
			this.amplifiers.push(obj);
		} else {
			this.amplifiers.push(new EdfaConfig(obj));
		}
		this.type_ids.add(obj.type_variety);
	}

	removeEdfa(id: string): EdfaConfig | null {
		if (this.type_ids.has(id)) {
			let edfa: EdfaConfig | null = null;

			this.amplifiers = filter(this.amplifiers, (e) => {
				if (e.type_variety !== id) {
					return true;
				} else {
					edfa = e;
					return false;
				}
			});

			this.type_ids.delete(id);
			return edfa;
		} else {
			throw Error("No Amplifier with that Type Variety");
		}
	}

	addTranceiver(obj: TransceiverParams) {
		if (this.type_ids.has(obj.type_variety)) {
			throw Error("Duplicate Type Variety Identifier for Transceiver.");
		}

		if (obj instanceof TranceiverConfig) {
			this.transceivers.push(obj);
		} else {
			this.transceivers.push(new TranceiverConfig(obj));
		}
		this.type_ids.add(obj.type_variety);
	}

	removeTransceiver(id: string): TranceiverConfig | null {
		if (this.type_ids.has(id)) {
			let tran: TranceiverConfig | null = null;

			this.transceivers = filter(this.transceivers, (e) => {
				if (e.type_variety !== id) {
					return true;
				} else {
					tran = e;
					return false;
				}
			});

			this.type_ids.delete(id);
			return tran;
		} else {
			throw Error("No Transceiver with that Type Variety");
		}
	}

	addFiber(obj: FiberParams) {
		if (this.type_ids.has(obj.type_variety)) {
			throw Error("Duplicate Type Variety Identifier for Fiber.");
		}

		if (obj instanceof FiberConfig) {
			this.fibers.push(obj);
		} else {
			this.fibers.push(new FiberConfig(obj));
		}
		this.type_ids.add(obj.type_variety);
	}

	removeFiber(id: string): FiberConfig | null {
		if (this.type_ids.has(id)) {
			let fib: FiberConfig | null = null;

			this.fibers = filter(this.fibers, (e) => {
				if (e.type_variety !== id) {
					return true;
				} else {
					fib = e;
					return false;
				}
			});

			this.type_ids.delete(id);
			return fib;
		} else {
			throw Error("No Fiber with that Type Variety");
		}
	}
}

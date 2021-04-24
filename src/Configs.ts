import {
	EdfaParams,
	FiberParams,
	ROADMParams,
	TransceiverParams,
	SpanParams,
	SI_Params,
	T_ModeParams,
} from "./Params";
import { Km } from "./Network_Defs";
import { map } from "lodash";

export class ModeConfig implements T_ModeParams {
	format: string;
	baud_rate: number;
	OSNR: number;
	bit_rate: number;
	roll_off: number;
	tx_osnr: number;
	min_spacing: number;
	cost: number;

	constructor(obj: T_ModeParams) {
		this.format = obj.format;
		this.baud_rate = obj.baud_rate;
		this.OSNR = obj.OSNR;
		this.bit_rate = obj.bit_rate;
		this.roll_off = obj.roll_off;
		this.tx_osnr = obj.tx_osnr;
		this.min_spacing = obj.min_spacing;
		this.cost = obj.cost;
	}

	get json() {
		return JSON.parse(JSON.stringify(this));
	}
}

export class TranceiverConfig implements TransceiverParams {
	type_variety: string;
	frequency: {
		min: number;
		max: number;
	};
	mode: ModeConfig[];

	constructor(obj: TransceiverParams) {
		this.frequency = obj.frequency;
		this.type_variety = obj.type_variety;
		this.mode = map(obj.mode, (e) => new ModeConfig(e));
	}

	get json() {
		return {
			type_variety: this.type_variety,
			frequency: this.frequency,
			mode: map(this.mode, (e) => e.json),
		};
	}
}

export class FiberConfig implements FiberParams {
	type_variety: string;
	dispersion: number;
	dispersion_slope?: number;
	gamma: number;
	pmd_coef: number;

	constructor(obj: FiberParams) {
		this.type_variety = obj.type_variety;
		this.dispersion = obj.dispersion;
		this.gamma = obj.gamma;
		this.pmd_coef = obj.pmd_coef;

		if (obj.dispersion_slope) {
			this.dispersion_slope = obj.dispersion_slope;
		}
	}

	get json() {
		return JSON.parse(JSON.stringify(this));
	}
}

export class EdfaConfig implements EdfaParams {
	type_variety: string;
	type_def: string;
	out_voa_auto: boolean;
	allowed_for_design: boolean;

	constructor(obj: EdfaParams) {
		Object.assign(this, obj);
	}

	get json() {
		return JSON.parse(JSON.stringify(this));
	}
}

export class ROADMConfig implements ROADMParams {
	target_pch_out_db: number;
	add_drop_osnr: number;
	pmd: number;
	restrictions: {
		preamp_variety_list: string[];
		booster_variety_list: string[];
	};

	constructor(obj: ROADMParams) {
		this.target_pch_out_db = obj.target_pch_out_db;
		this.add_drop_osnr = obj.add_drop_osnr;
		this.pmd = obj.pmd;
		this.restrictions = obj.restrictions;
	}

	get json() {
		return JSON.parse(JSON.stringify(this));
	}
}

export class SpanConfig implements SpanParams {
	power_mode: boolean;
	delta_power_range_db: [number, number, number];
	max_fiber_lineic_loss_for_raman: number;
	target_extended_gain: number;
	max_length: number;
	length_units: Km;
	max_loss: number;
	padding: number;
	EOL: number;
	con_in: number;
	con_out: number;

	constructor(obj: SpanParams) {
		Object.assign(this, obj);
	}

	get json() {
		return JSON.parse(JSON.stringify(this));
	}
}

export class SpectralInformationConfig implements SI_Params {
	f_min: number;
	baud_rate: number;
	f_max: number;
	spacing: number;
	power_dbm: number;
	power_range_db: [number, number, number];
	roll_off: number;
	tx_osnr: number;
	sys_margins: number;

	constructor(obj: SI_Params) {
		Object.assign(this, obj);
	}

	get json() {
		return JSON.parse(JSON.stringify(this));
	}
}

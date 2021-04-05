import { Km } from "./Network_Defs";
export enum NoiseModel {
	variable_gain = "variable_gain",
	fixed_gain = "fixed_gain",
	None = "None",
}

export interface EdfaParams {
	type_variety: string;
	type_def: NoiseModel;
	gain_flatmax?: number;
	gain_min?: number;
	p_max?: number;
	nf_min?: number;
	nf_max?: number;
	out_voa_auto: boolean;
	allowed_for_design: boolean;
}

export interface FiberParams {
	type_variety: string;
	dispersion: number;
	dispersion_slope?: number;
	gamma: number;
	pmd_coef: number;
}

export interface T_ModeParams {
	format: string;
	baud_rate: number;
	OSNR: number;
	bit_rate: number;
	roll_off: number;
	tx_osnr: number;
	min_spacing: number;
	cost: number;
}

export interface TransceiverParams {
	type_variety: string;
	frequency: {
		min: number;
		max: number;
	};
	mode: T_ModeParams[];
}

export interface ROADMParams {
	target_pch_out_db: number;
	add_drop_osnr: number;
	pmd: number;
	restrictions: {
		preamp_variety_list: string[];
		booster_variety_list: string[];
	};
}

export interface SpanParams {
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
}

export interface SI_Params {
	f_min: number;
	baud_rate: number;
	f_max: number;
	spacing: number;
	power_dbm: number;
	power_range_db: [number, number, number];
	roll_off: number;
	tx_osnr: number;
	sys_margins: number;
}

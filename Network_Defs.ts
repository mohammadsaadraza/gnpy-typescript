export type NetworkElement =
  | 'Transceiver'
  | 'Roadm'
  | 'Edfa'
  | 'Fiber'
  | 'RamanFiber';
export type Km = 'km';

export interface Network_Node {
  uid: string;
  type: NetworkElement;
  metadata: {
    location: {
      latitude: number;
      longitude: number;
      city: string;
      region: string;
    };
  };
}

export interface Network_Roadm extends Network_Node {
  params: {
    target_pch_out_db: number;
    restrictions: {};
    per_degree_pch_out_db: {};
  };
}

export interface Network_Fiber extends Network_Node {
  type_variety: string;
  params: {
    length: number;
    loss_coef: number;
    length_units: Km;
    att_in: number;
    con_in: number;
    con_out: number;
  };
}

export interface Network_Transceiver extends Network_Node {
  type_variety?: string;
}

export interface Network_Edfa extends Network_Node {
  type_variety: string;
  operational: {
    gain_target: number;
    delta_p: number;
    tilt_target: number;
    out_voa: number;
  };
}

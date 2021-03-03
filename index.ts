import { Transceiver, Roadm } from "./Network_Elements";

const t = new Transceiver({
	uid: "vdfsvv",
	type: "Roadm",
	metadata: {
		location: {
			latitude: 0,
			longitude: 5,
			city: "Islamabad",
			region: "Pakistan",
		},
	},
});

console.log(t.info);

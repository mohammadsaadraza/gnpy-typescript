import { PathRequest_Collection, SyncVector_Collection } from "./Request";

export class ServiceRequests {
	pathRequests: PathRequest_Collection;
	syncVectors: SyncVector_Collection;

	constructor(reqs?: PathRequest_Collection, sVecs?: SyncVector_Collection) {
		if (reqs && sVecs) {
			this.pathRequests = reqs;
			this.syncVectors = sVecs;
		} else {
			this.pathRequests = new PathRequest_Collection();
			this.syncVectors = new SyncVector_Collection();
		}
	}

	json() {
		return {
			"path-request": this.pathRequests.json,
			synchronization: this.syncVectors.json,
		};
	}
}

import { PathRequest_Collection, SyncVector_Collection } from "./Request";

export class ServiceRequests {
	pathRequests: PathRequest_Collection;
	syncVectors: SyncVector_Collection;

	constructor(reqs?: PathRequest_Collection, sVecs?: SyncVector_Collection) {
		this.pathRequests = reqs ? reqs : new PathRequest_Collection();
		this.syncVectors = sVecs ? sVecs : new SyncVector_Collection();
	}

	json() {
		return {
			"path-request": this.pathRequests.json,
			synchronization: this.syncVectors.json,
		};
	}
}

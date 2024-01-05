import type { Plugin } from 'betterdiscord';

import features from "./patchers.ts";



export default class implements Plugin {
	public start() {
		features.forEach(m => new m().start());
	}

	public stop() {
		features.forEach(m => new m().stop());
	}
};
import type { Plugin } from 'betterdiscord';
import type { Module } from "./patchers/patchers.d.ts";

import features from "./patchers.ts";



export default class implements Plugin {
	private modules: Module[];

	public constructor() {
		this.modules = features.map(m => new m());
	}


	public start() {
		this.modules.forEach(m => m.start());
	}
	public stop() {
		this.modules.forEach(m => m.stop());
	}
}
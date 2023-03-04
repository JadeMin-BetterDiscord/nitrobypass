import type { Plugin } from 'betterdiscord';
import type { ExportedModule } from "./features.js";

//@ts-expect-error
import features from "./features/*.tsx";



export default class implements Plugin {
	public start(): void {
		features.forEach((m: ExportedModule)=> m.default.start());
	};
	public stop(): void {
		features.forEach((m: ExportedModule)=> m.default.stop());
	};
};
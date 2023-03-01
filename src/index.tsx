import type { Plugin } from 'betterdiscord';

import Live from "./live.js";
import Emoji from "./emoji.js";



export default class implements Plugin {
	public async start(): Promise<void> {
		await Live.start();
		await Emoji.start();
	};
	public async stop(): Promise<void> {
		await Live.stop();
		await Emoji.stop();
	};
};
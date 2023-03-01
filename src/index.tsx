import type { Plugin } from 'betterdiscord';

import { prompt } from "./.modules/prompt.js";

import Live from "./live.js";
import Emoji from "./emoji.js";
const { Webpack, Patcher } = BdApi;



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
import type { BdApi, Plugin } from 'betterdiscord';
import type { APIUser } from 'discord-api-types/v10';
import type { ToCamel } from "./@types/extensions.js";
declare type UserPremiumType = -1 | 0 | 1 | 2 | 3;

import { prompt } from "./prompt.js";



export default class implements Plugin {
	#defaultPremiumType: UserPremiumType = -1;


	private async getCurrentUser(): Promise<ToCamel<APIUser>> {
		const filter = BdApi.Webpack.Filters.byProps("getCurrentUser");
		return (await BdApi.Webpack.waitForModule(filter)).getCurrentUser();
	};

	public async start(): Promise<void> {
		const currentUser = await this.getCurrentUser();
		this.#defaultPremiumType = currentUser.premiumType!;
		currentUser.premiumType = 2;
		const result = await prompt("Premium Type", "Hello, World!");
		console.log(result);
	};

	public async stop(): Promise<void> {
		const currentUser = await this.getCurrentUser();
		currentUser.premiumType = this.#defaultPremiumType;
	};
};
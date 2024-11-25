import type { Module } from "./patchers.d.ts";
import type { APIUser } from 'discord-api-types/v10';
import type { ToCamel } from "../@types/extensions.js";
type UserPremiumType = 0 | 1 | 2 | 3;

const { React, Webpack, Patcher, UI } = BdApi;



export default class implements Module {
	private defaultPremiumType: UserPremiumType;
	private timer: NodeJS.Timeout | null;

	public constructor() {
		this.defaultPremiumType = 0;
		this.timer = null;
	}

	private async getCurrentUser(): Promise<ToCamel<APIUser>> {
		const { getCurrentUser } = await Webpack.waitForModule(
			Webpack.Filters.byKeys("getCurrentUser")
		);
	
		return getCurrentUser();
	}
	private async setFakePremium() {
		const currentUser = await this.getCurrentUser();

		this.defaultPremiumType = currentUser.premiumType!;
		currentUser.premiumType = 2;

		console.debug("Successfully Spoofed as a Nitro user");
	}
	private async restoreDefaultPremium() {
		const currentUser = await this.getCurrentUser();

		currentUser.premiumType = this.defaultPremiumType;
	}

	public async start() {
		await this.setFakePremium();

		this.timer = setInterval(async () => {
			await this.setFakePremium();
		}, 10 * 1000);
	}
	public async stop() {
		clearInterval(this.timer!);
		this.restoreDefaultPremium();
	}
}
import type { APIUser } from 'discord-api-types/v10';
import type { ToCamel } from "../@types/extensions.js";
import type { Module } from "./patchers.d.ts";
type UserPremiumType = 0 | 1 | 2 | 3;

const { React, Webpack, Patcher, UI } = BdApi;

const getCurrentUser = async (): Promise<ToCamel<APIUser>> => {
	const { getCurrentUser } = await Webpack.waitForModule(
		Webpack.Filters.byKeys("getCurrentUser")
	);

	return getCurrentUser();
};

let defaultPremiumType: UserPremiumType = 0;



export default class implements Module {
	public async start() {
		const currentUser = await getCurrentUser();

		defaultPremiumType = currentUser.premiumType!;
		currentUser.premiumType = 2;
	}
	
	public async stop() {
		const currentUser = await getCurrentUser();

		currentUser.premiumType = defaultPremiumType;
	}
};
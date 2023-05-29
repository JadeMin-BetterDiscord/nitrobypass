import type { APIUser } from 'discord-api-types/v10';
import type { ToCamel } from "../../@types/extensions.d.js";
import type { FeatureModule } from "../features.d.js";
declare type UserPremiumType = 0 | 1 | 2 | 3;

const { React, Webpack, Patcher, UI } = BdApi;
const getCurrentUser = async (): Promise<ToCamel<APIUser>> => {
	const { getCurrentUser } = await Webpack.waitForModule(Webpack.Filters.byProps("getCurrentUser"));
	return getCurrentUser();
};
let defaultPremiumType: UserPremiumType = 0;



const module: FeatureModule = {
	async start() {
		const currentUser = await getCurrentUser();
		defaultPremiumType = currentUser.premiumType!;
		currentUser.premiumType = 2;
	},
	async stop() {
		const currentUser = await getCurrentUser();
		currentUser.premiumType = defaultPremiumType;
	},
} as const;

export default module;
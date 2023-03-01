import type { APIUser } from 'discord-api-types/v10';
import type { ToCamel } from "./.modules/extensions.d.js";
declare type UserPremiumType = -1 | 0 | 1 | 2 | 3;

const { Webpack } = BdApi;
let defaultPremiumType: UserPremiumType = -1;
const getCurrentUser = async (): Promise<ToCamel<APIUser>> => {
	return (
		await Webpack.waitForModule(Webpack.Filters.byProps("getCurrentUser"))
	).getCurrentUser();
};



export default {
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
/*import type { APIMessage } from 'discord-api-types/v10';
import type { ToCamel } from "../../@types/extensions.js";*/
import type { FeatureModule } from "../features.js";

import { prompt } from "./.modules/prompt.js";
const { React, Webpack, Patcher, UI } = BdApi;



const module: FeatureModule = {
	async start() {
		const result = await prompt("테스트", "테스트입니다.");
		UI.showToast(`입력된 값은 "${result}"입니다.`, {
			type: 'info',
			timeout: 3000,
		});

		/*UI.showConfirmationModal("안녕", (
			<div>
				<p>입력된 값은 "{result}"입니다.</p>
			</div>
		));*/
	},
	stop() {}
} as const;

export default module;
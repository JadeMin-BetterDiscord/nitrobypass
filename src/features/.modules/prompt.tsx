const { React, Webpack } = BdApi;
const SEARCH_EXPORTS = {
	searchExports: true
} as const;



// ref: https://github.com/rauenzi/BDPluginLibrary/blob/master/src/modules/discordmodules.js
export const prompt = async (title: string, defaultValue=''): Promise<string | null> => {
	const { Messages } = await Webpack.waitForModule(m=> m?.Messages && Object.keys(m?.Messages).length);
	const ConfirmationModal = await Webpack.waitForModule(m=> m?.toString?.()?.includes?.(".confirmButtonColor"), SEARCH_EXPORTS);
	const ButtonData = await Webpack.waitForModule(m=> m?.BorderColors, SEARCH_EXPORTS);
	const TextBox = await Webpack.waitForModule(m=> m?.defaultProps?.type === "text", SEARCH_EXPORTS);
	const openModal = await Webpack.waitForModule(m=> m?.toString?.()?.includes?.("onCloseCallback") && m?.toString?.()?.includes?.("Layer"), SEARCH_EXPORTS);
	let toReturn = defaultValue;


	return new Promise((resolve) => {
		openModal((props: any) => {
			if(props.transitionState === 3) return resolve(null);

			return (
				<ConfirmationModal
					header={title}
					confirmButtonColor={ButtonData.Colors.BRAND}
					confirmText={Messages.OKAY}
					cancelText={Messages.CANCEL}
					onConfirm={()=> resolve(toReturn)}
					onCancel={()=> resolve(null)}
					{...props}

					children={
						React.createElement(React.memo(() => {
							const [value, setValue] = React.useState(defaultValue);

							return (
								<TextBox
									value={value}
									onInput={({ target }: React.ChangeEvent<HTMLInputElement>) => {
										setValue(target.value);
										toReturn = target.value;
									}}
								/>
							);
						}))
					}
				/>
			);
		});
	});
};
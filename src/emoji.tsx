import type { APIMessage } from 'discord-api-types/v10';
import type { ToCamel } from "./.modules/extensions.js";

const { Webpack, Patcher } = BdApi;



export default {
	async start() {
		const MessageActions = Webpack.getModule(Webpack.Filters.byProps("jumpToMessage", "_sendMessage"));
		
		
		Patcher.before('SEND_EMOJI', MessageActions, "sendMessage", (thisObject: any, args: any) => {
			type Args = [string, any];
			const [channelId, message]: Args = args;
			const invalidEmojis = message.validNonShortcutEmojis;

			if(invalidEmojis.length > 0) {
				invalidEmojis.forEach((emoji: any) => {
					if(emoji.url.startsWith("/assets/")) return;
					//const emojiName = emoji.allNamesString.replace(/~\d/g, '');
					const emojiFull = `<${emoji.animated ? 'a':''}${emoji.allNamesString}${emoji.id}>`;
					message.content = message.content.replace(emojiFull, `${emoji.url}&size=${48}`);
				});
			}
			return args;
		});

		Patcher.before('EDIT_EMOJI', MessageActions, "editMessage", (thisObject: any, args: any) => {
			type Args = [string, string, APIMessage];
			const [guildId, channelId, message]: Args = args;
			const rawEmoji = message.content.match(/<(a)?:(.*)?:\d{18}>/g);

			if(rawEmoji !== null) {
				rawEmoji.forEach((emoji: string) => {
					const emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.match(/\d{18}/g)![0]}?size=${48}`;
					message.content = message.content.replace(emoji, emojiUrl);
				});
			}
		});
	},
	async stop() {
		Patcher.unpatchAll('SEND_EMOJI');
		Patcher.unpatchAll('EDIT_EMOJI');
	},
} as const;
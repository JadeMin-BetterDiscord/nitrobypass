import type { Module } from "./patchers.d.ts";
import type { APIMessage } from 'discord-api-types/v10';

const { React, Webpack, Patcher, UI } = BdApi;



export default class implements Module {
	public start() {
		const MessageActions = Webpack.getModule(
			Webpack.Filters.byKeys("jumpToMessage", "_sendMessage")
		);
		
		Patcher.before("SEND_EMOJI", MessageActions, "sendMessage", (thisObject: any, args: any) => {
			type Args = [string, any];
			const [channelId, message]: Args = args;
			const invalidEmojis = message.validNonShortcutEmojis;

			if (invalidEmojis.length > 0) {
				invalidEmojis.forEach((emoji: any) => {
					if (emoji.url.startsWith("/assets/")) return;

					const emojiFull = `<${emoji.animated ? 'a' : ''}${emoji.allNamesString}${emoji.id}>`;
					message.content = message.content.replace(emojiFull, `${emoji.url}&size=${48}`);
				});
			}

			return args;
		});

		Patcher.before("EDIT_EMOJI", MessageActions, "editMessage", (thisObject: any, args: any) => {
			type Args = [string, string, APIMessage];
			const [guildId, channelId, message]: Args = args;
			const rawEmoji = message.content.match(/<(a)?:(.*)?:\d{18}>/g);

			if (rawEmoji !== null) {
				rawEmoji.forEach((emoji: string) => {
					const emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.match(/\d{18}/g)![0]}?size=${48}`;
					message.content = message.content.replace(emoji, emojiUrl);
				});
			}

			return args;
		});
	}
	public stop() {
		Patcher.unpatchAll("SEND_EMOJI");
		Patcher.unpatchAll("EDIT_EMOJI");
	}
}
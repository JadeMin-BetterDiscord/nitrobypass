/**
 * @name NitroBypass
 * @description 고해상도의 라이브 송출과 이모티콘을 니트로 없이 사용하세요! (스티커 미지원)
 * @version 0.0.0
 * @author JadeMin
 */
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/live.tsx
var { Webpack } = BdApi;
var defaultPremiumType = -1;
var getCurrentUser = async () => {
  return (await Webpack.waitForModule(Webpack.Filters.byProps("getCurrentUser"))).getCurrentUser();
};
var live_default = {
  async start() {
    const currentUser = await getCurrentUser();
    defaultPremiumType = currentUser.premiumType;
    currentUser.premiumType = 2;
  },
  async stop() {
    const currentUser = await getCurrentUser();
    currentUser.premiumType = defaultPremiumType;
  }
};

// src/emoji.tsx
var { Webpack: Webpack2, Patcher } = BdApi;
var emoji_default = {
  async start() {
    const MessageActions = Webpack2.getModule(Webpack2.Filters.byProps("jumpToMessage", "_sendMessage"));
    Patcher.before("SEND_EMOJI", MessageActions, "sendMessage", (thisObject, args) => {
      const [channelId, message] = args;
      const invalidEmojis = message.validNonShortcutEmojis;
      if (invalidEmojis.length > 0) {
        invalidEmojis.forEach((emoji) => {
          if (emoji.url.startsWith("/assets/"))
            return;
          const emojiFull = `<${emoji.animated ? "a" : ""}${emoji.allNamesString}${emoji.id}>`;
          message.content = message.content.replace(emojiFull, `${emoji.url}&size=${48}`);
        });
      }
      return args;
    });
    Patcher.before("EDIT_EMOJI", MessageActions, "editMessage", (thisObject, args) => {
      const [guildId, channelId, message] = args;
      const rawEmoji = message.content.match(/<(a)?:(.*)?:\d{18}>/g);
      if (rawEmoji) {
        rawEmoji.forEach((emoji) => {
          const emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.match(/\d{18}/g)[0]}?size=${48}`;
          message.content = message.content.replace(emoji, emojiUrl);
        });
      }
    });
  },
  async stop() {
    Patcher.unpatchAll("SEND_EMOJI");
    Patcher.unpatchAll("EDIT_EMOJI");
  }
};

// src/index.tsx
var { Webpack: Webpack3, Patcher: Patcher2 } = BdApi;
var src_default = class {
  async start() {
    await live_default.start();
    await emoji_default.start();
  }
  async stop() {
    await live_default.stop();
    await emoji_default.stop();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

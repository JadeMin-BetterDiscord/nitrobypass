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
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/live.tsx
var { Webpack } = BdApi, defaultPremiumType = -1, getCurrentUser = async () => (await Webpack.waitForModule(Webpack.Filters.byProps("getCurrentUser"))).getCurrentUser(), live_default = {
  async start() {
    let currentUser = await getCurrentUser();
    defaultPremiumType = currentUser.premiumType, currentUser.premiumType = 2;
  },
  async stop() {
    let currentUser = await getCurrentUser();
    currentUser.premiumType = defaultPremiumType;
  }
};

// src/emoji.tsx
var { Webpack: Webpack2, Patcher } = BdApi, emoji_default = {
  async start() {
    let MessageActions = Webpack2.getModule(Webpack2.Filters.byProps("jumpToMessage", "_sendMessage"));
    Patcher.before("SEND_EMOJI", MessageActions, "sendMessage", (thisObject, args) => {
      let [channelId, message] = args, invalidEmojis = message.validNonShortcutEmojis;
      return invalidEmojis.length > 0 && invalidEmojis.forEach((emoji) => {
        if (emoji.url.startsWith("/assets/"))
          return;
        let emojiFull = `<${emoji.animated ? "a" : ""}${emoji.allNamesString}${emoji.id}>`;
        message.content = message.content.replace(emojiFull, `${emoji.url}&size=48`);
      }), args;
    }), Patcher.before("EDIT_EMOJI", MessageActions, "editMessage", (thisObject, args) => {
      let [guildId, channelId, message] = args, rawEmoji = message.content.match(/<(a)?:(.*)?:\d{18}>/g);
      rawEmoji !== null && rawEmoji.forEach((emoji) => {
        let emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.match(/\d{18}/g)[0]}?size=48`;
        message.content = message.content.replace(emoji, emojiUrl);
      });
    });
  },
  async stop() {
    Patcher.unpatchAll("SEND_EMOJI"), Patcher.unpatchAll("EDIT_EMOJI");
  }
};

// src/index.tsx
var src_default = class {
  async start() {
    await live_default.start(), await emoji_default.start();
  }
  async stop() {
    await live_default.stop(), await emoji_default.stop();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

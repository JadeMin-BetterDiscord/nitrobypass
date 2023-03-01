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

// src/prompt.tsx
var { React, Webpack, UI } = BdApi;
var prompt = async (title, defaultValue = "") => {
  const { Messages } = await Webpack.waitForModule((m) => m?.Messages && Object.keys(m?.Messages).length);
  const ConfirmationModal = await Webpack.waitForModule((m) => m?.toString?.()?.includes(".confirmButtonColor"), {
    searchExports: true
  });
  const ButtonData = await Webpack.waitForModule((m) => m?.BorderColors, { searchExports: true });
  const TextBox = await Webpack.waitForModule((m) => m?.defaultProps?.type === "text", {
    searchExports: true
  });
  const openModal = await Webpack.waitForModule((m) => m?.toString?.()?.includes("onCloseCallback") && m?.toString?.()?.includes("Layer"), {
    searchExports: true
  });
  let toReturn = defaultValue;
  return new Promise((resolve) => {
    openModal((props) => {
      if (props.transitionState === 3)
        return resolve(null);
      return /* @__PURE__ */ React.createElement(
        ConfirmationModal,
        {
          header: title,
          confirmButtonColor: ButtonData.Colors.BRAND,
          confirmText: Messages.OKAY,
          cancelText: Messages.CANCEL,
          onConfirm: () => resolve(toReturn),
          onCancel: () => resolve(null),
          ...props,
          children: React.createElement(React.memo(() => {
            const [value, setValue] = React.useState(defaultValue);
            return /* @__PURE__ */ React.createElement(
              TextBox,
              {
                value,
                onInput: ({ target }) => {
                  setValue(target.value);
                  toReturn = target.value;
                }
              }
            );
          }))
        }
      );
    });
  });
};

// src/index.tsx
var src_default = class {
  #defaultPremiumType = -1;
  async getCurrentUser() {
    const filter = BdApi.Webpack.Filters.byProps("getCurrentUser");
    return (await BdApi.Webpack.waitForModule(filter)).getCurrentUser();
  }
  async start() {
    const currentUser = await this.getCurrentUser();
    this.#defaultPremiumType = currentUser.premiumType;
    currentUser.premiumType = 2;
    const result = await prompt("Premium Type", "Hello, World!");
    console.log(result);
  }
  async stop() {
    const currentUser = await this.getCurrentUser();
    currentUser.premiumType = this.#defaultPremiumType;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

import type { BuildOptions } from 'esbuild';

import ESBuild from 'esbuild';
import { getMetaString } from "./meta.js";

const defaultBuildOptions: BuildOptions = {
	entryPoints: ["./src/index.tsx"],
	charset: 'utf8',

	platform: 'node',
	format: 'cjs',
	
	bundle: true,
	treeShaking: true,

	/*jsxFactory: "BdApi.React.createElement",
	jsxFragment: "BdApi.React.Fragment",*/

	banner: {
		js: getMetaString()
	}
};



await ESBuild.build({
	...defaultBuildOptions,
	outfile: `${process.env.APPDATA}/BetterDiscord/plugins/NitroBypass.plugin.js`,

	minify: true
});
await ESBuild.build({
	...defaultBuildOptions,
	outfile: "./dist/NitroBypass.plugin.js",

	minify: false,
});
console.log(`✅ - 플러그인 빌드 작업이 완료되었습니다!`);
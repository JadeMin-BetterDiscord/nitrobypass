import type { BuildOptions } from 'esbuild';

import ESBuild from 'esbuild';
import PLUGIN_GlobImport from 'esbuild-plugin-import-glob';
import { getMetaString, getMeta } from "./meta.js";

const defaultBuildOptions: BuildOptions = {
	entryPoints: ["./src/index.ts"],
	charset: 'utf8',

	platform: 'neutral',
	format: 'cjs',
	
	bundle: true,
	treeShaking: true,

	banner: {
		js: getMetaString()
	},

	plugins: [
		PLUGIN_GlobImport.default()
	]
};



await ESBuild.build({
	...defaultBuildOptions,
	outfile: `${process.env.APPDATA}/BetterDiscord/plugins/${getMeta('name').replace(/\s/g, '_')}.plugin.js`,

	minify: true,
});
await ESBuild.build({
	...defaultBuildOptions,
	outfile: "./dist/NitroBypass.plugin.js",

	minifySyntax: true,
});
console.log(`✅ - 플러그인 빌드 작업이 완료되었습니다!`);
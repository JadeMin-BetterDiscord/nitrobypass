import type { BuildOptions, BuildContext } from 'esbuild';
import type { BuildTypes } from "./@types/build.js";

import { build, context } from 'esbuild';
import PLUGIN_GlobImport from 'esbuild-plugin-import-glob';
import { buildTyping } from "./@types/build.js";
import { getMetaString, getMeta } from "./meta.js";

const buildArgv = process.argv.slice(2)[0] as BuildTypes;
const buildType = buildTyping(buildArgv);
const pluginFilename = getMeta('name').replace(/\s/g, '_');
const isBDMode = buildType.PUBLISH_BD || buildType.TEST_BD;
const defaultOptions: BuildOptions = {
	entryPoints: ["./src/index.ts"],
	charset: 'utf8',

	platform: 'node',
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



await build({
	...defaultOptions,
	outfile: isBDMode?
		`${process.env.APPDATA}/BetterDiscord/plugins/${pluginFilename}.plugin.js`
		:
		`./dist/${pluginFilename}.plugin.js`,

	minify: buildType.PUBLISH,
	minifySyntax: buildType.TEST,
});
if(isBDMode) console.log(`✅ - 플러그인을 BetterDiscord에 설치하였습니다!`);
console.log(`✅ - 플러그인 빌드 작업이 완료되었습니다!`);
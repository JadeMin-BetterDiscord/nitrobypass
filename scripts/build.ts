import type { BuildOptions, BuildContext } from 'esbuild';
import type { BuildTypes } from "./@types/build.js";

import { rm } from 'fs/promises';
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



await rm("./dist", { recursive: true, force: true });
await build({
	...defaultOptions,
	outfile: `./dist/${pluginFilename}.plugin.js`,

	minify: buildType.PUBLISH || buildType.PUBLISH_BD,
	minifySyntax: buildType.TEST || buildType.TEST_BD,
	sourcemap: buildType.TEST || buildType.TEST_BD,
});
console.log(`✅ - 플러그인 빌드 작업이 완료되었습니다!`);

if(isBDMode) {
	await build({
		...defaultOptions,
		outfile: `${process.env.APPDATA}/BetterDiscord/plugins/${pluginFilename}.plugin.js`,
		
		minify: buildType.PUBLISH_BD,
		minifySyntax: buildType.TEST_BD
	});
	console.log(`✅ - 플러그인을 BetterDiscord 폴더에 빌드했습니다!`);
}
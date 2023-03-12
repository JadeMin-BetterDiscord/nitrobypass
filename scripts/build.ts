import type { BuildOptions, BuildContext } from 'esbuild';
import type { BuildTypes } from "./@types/build.js";

import { rm, copyFile } from 'fs/promises';
import { build, context } from 'esbuild';
import PLUGIN_GlobImport from 'esbuild-plugin-import-glob';

import { buildTyping, getCurrentType } from "./@types/build.js";
import { getMetaString, getMeta } from "./meta.js";

const buildArgv = process.argv.slice(2)[0] as BuildTypes;
const buildType = buildTyping(buildArgv);
const pluginFilename = getMeta('name').replace(/\s/g, '_');
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



if(buildType.BD) {
	await copyFile(
		`./dist/${pluginFilename}.plugin.js`,
		`${process.env.APPDATA}/BetterDiscord/plugins/${pluginFilename}.plugin.js`
	);
	console.log(`✅ - 플러그인을 BetterDiscord 폴더에 복사했습니다!`);
} else {
	await rm("./dist", { recursive: true, force: true });

	await build({
		...defaultOptions,
		outfile: `./dist/${pluginFilename}.plugin.js`,
	
		minify: buildType.PUBLISH,
		minifySyntax: buildType.TEST,
		sourcemap: buildType.TEST,
	});
	console.log(`✅ - ${getCurrentType(buildType)} 플러그인 빌드 작업이 완료되었습니다!`);	
}
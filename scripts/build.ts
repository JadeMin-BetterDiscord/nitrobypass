import type { BuildOptions } from 'esbuild';
import type { BuildTypes } from "./buildTyping.ts";

import { rm, copyFile } from 'node:fs/promises';
import { build } from 'esbuild';

import { getBuildType } from "./buildTyping.ts";
import { getMetaString, getMetaByKey } from "./meta.ts";

const pluginName = getMetaByKey('name').replace(/\s/g, '_');

const buildArgv = process.argv.slice(2)[0] as BuildTypes | undefined;
const buildType = getBuildType(buildArgv);
const defaultOption: BuildOptions = {
	entryPoints: ["./src/index.ts"],
	charset: 'utf8',

	platform: 'node',
	format: 'cjs',
	
	bundle: true,
	treeShaking: true,

	banner: {
		js: getMetaString()
	}
};



await rm("./dist", { recursive: true, force: true });
await build({
	...defaultOption,
	outfile: `./dist/${pluginName}.plugin.js`,

	minify: buildType.PUBLISH,
	minifySyntax: buildType.TEST,
	sourcemap: buildType.TEST,
});
console.log(`✅ - 플러그인 빌드 작업이 완료되었습니다!`);

if (buildType.BD) {
	await copyFile(
		`./dist/${pluginName}.plugin.js`,
		`${process.env.APPDATA}/BetterDiscord/plugins/${pluginName}.plugin.js`
	);
	console.log(`✅ - 플러그인을 BetterDiscord 폴더에 복사했습니다!`);
}
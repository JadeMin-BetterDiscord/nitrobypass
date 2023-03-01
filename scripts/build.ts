import type { BuildOptions } from 'esbuild';

import ESBuild from 'esbuild';
import { getStringMeta, getMeta } from "./meta.js";

const defaultBuildOptions: BuildOptions = {
	entryPoints: ["./src/index.tsx"],
	charset: 'utf8',

	platform: 'node',
	format: 'cjs',
	
	bundle: true,
	treeShaking: true,

	banner: {
		js: getStringMeta()
	}
};



await ESBuild.build({
	...defaultBuildOptions,
	outfile: `${process.env.APPDATA}/BetterDiscord/plugins/${getMeta('name')}.plugin.js`,

	minify: true,
});
await ESBuild.build({
	...defaultBuildOptions,
	outfile: "./dist/NitroBypass.plugin.js",

	minifySyntax: true,
});
console.log(`✅ - 플러그인 빌드 작업이 완료되었습니다!`);
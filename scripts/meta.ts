import META from "../src/meta.json";

type MetaK = keyof typeof META;


function toMetaString(meta: {[KEY: string]: string}) {
	return Object.entries(meta)
		.map(([key, value]) => ` * @${key} ${value}`)
		.join("\n");
}



export function getMetaString(): string {
	return `/**\n${toMetaString(META)}\n */`;
}
export function getMetaByKey(headerName: MetaK): String {
	return META[headerName];
}
import META from "../src/meta.json";

const toMetaString = (meta: {[KEY: string]: string}) => {
	return Object.entries(meta).map(([key, value]) => ` * @${key} ${value}`).join("\n");
};



export const getMetaString = (): string => {
	return `/**\n${toMetaString(META)}\n */`;
};
export const getMetaByKey = (headerName: keyof typeof META): typeof META[keyof typeof META] => {
	return META[headerName];
};
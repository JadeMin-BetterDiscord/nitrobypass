import META from "../meta.json";

const toMetaHeader = ([key, value]: [string, string]): string => {
	return ` * @${key} ${value}`;
};
const toMetaHeaders = (meta: Record<string, string>): string => {
	return Object.entries(meta).map(([key, value])=> ` * @${key} ${value}`).join("\n");
};



export const getMetaString = (): string => {
	return `/**\n${toMetaHeaders(META)}\n */`;
};
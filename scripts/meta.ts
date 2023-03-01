import META from "../meta.json" assert {type: "json"};

/*const toMetaHeader = ([key, value]: [string, string]): string => {
	return ` * @${key} ${value}`;
};*/
const toMetaHeaders = (meta: Record<string, string>): string => {
	return Object.entries(meta).map(([key, value])=> ` * @${key} ${value}`).join("\n");
};



export const getStringMeta = (): string => {
	return `/**\n${toMetaHeaders(META)}\n */`;
};
export const getMeta = (headerName: keyof typeof META): string => {
	return META[headerName];
};
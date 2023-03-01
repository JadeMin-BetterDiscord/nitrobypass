import META from "../meta.json" assert {type: "json"};

/*const toMetaHeader = ([key, value]: [string, string]): string => {
	return ` * @${key} ${value}`;
};*/
const toMetaString = (meta: Record<string, string>): string => {
	return Object.entries(meta).map(([key, value])=> ` * @${key} ${value}`).join("\n");
};



export const getMetaString = (): string => {
	return `/**\n${toMetaString(META)}\n */`;
};
export const getMeta = (headerName: keyof typeof META): string => {
	return META[headerName];
};
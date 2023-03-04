export declare interface FeatureModule {
	start(): void | Promise<void>;
	stop(): void | Promise<void>;
}

export declare interface ExportedModule {
	default: FeatureModule;
}
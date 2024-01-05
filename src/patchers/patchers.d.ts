export interface Module {
	start(): void | Promise<void>;
	stop(): void | Promise<void>;
}
import { HindenburgPlugin, WorkerPlugin } from "@skeldjs/hindenburg";
export * from "./api";

@HindenburgPlugin("hbplugin-chat-interceptor", "1.0.0", "none")
export default class extends WorkerPlugin {}

require("./hooks/chatMessageHook");
